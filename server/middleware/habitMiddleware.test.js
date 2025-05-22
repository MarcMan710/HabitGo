const { authorizeHabitOwner } = require('./habitMiddleware');
const Habit = require('../models/Habit'); // To be mocked

jest.mock('../models/Habit'); // Mock the Habit model

describe('authorizeHabitOwner Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: {},
      user: { _id: 'userId123' }, // Mock authenticated user
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    Habit.findById.mockReset(); // Reset mock before each test
  });

  test('should return 400 if habit ID is missing', async () => {
    await authorizeHabitOwner(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Habit ID not found in request parameters' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should return 404 if habit not found', async () => {
    mockReq.params.id = 'nonExistentHabitId';
    Habit.findById.mockResolvedValue(null);
    await authorizeHabitOwner(mockReq, mockRes, mockNext);
    expect(Habit.findById).toHaveBeenCalledWith('nonExistentHabitId');
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Habit not found' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should return 403 if user is not authenticated (req.user is undefined)', async () => {
    mockReq.params.id = 'habitId123';
    mockReq.user = undefined; // Simulate unauthenticated user
    const mockHabit = { _id: 'habitId123', user: 'ownerId456' };
    Habit.findById.mockResolvedValue(mockHabit);

    await authorizeHabitOwner(mockReq, mockRes, mockNext);

    expect(Habit.findById).toHaveBeenCalledWith('habitId123');
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not authorized to perform this action' });
    expect(mockNext).not.toHaveBeenCalled();
  });
  
  test('should return 403 if user is not the owner of the habit', async () => {
    mockReq.params.id = 'habitId123';
    const mockHabit = { 
      _id: 'habitId123', 
      user: { toString: () => 'ownerId456' } // Mock habit owned by another user
    };
    Habit.findById.mockResolvedValue(mockHabit);
    
    await authorizeHabitOwner(mockReq, mockRes, mockNext);
    
    expect(Habit.findById).toHaveBeenCalledWith('habitId123');
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not authorized to perform this action' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should call next() if user is authenticated and is the owner', async () => {
    mockReq.params.id = 'habitId123';
    const mockHabit = { 
      _id: 'habitId123', 
      user: { toString: () => 'userId123' } // Habit owned by the authenticated user
    };
    Habit.findById.mockResolvedValue(mockHabit);
    
    await authorizeHabitOwner(mockReq, mockRes, mockNext);
    
    expect(Habit.findById).toHaveBeenCalledWith('habitId123');
    expect(mockReq.habit).toEqual(mockHabit); // Check if habit is attached to req
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  test('should return 500 if Habit.findById throws an error', async () => {
    mockReq.params.id = 'habitId123';
    const errorMessage = 'Database error';
    Habit.findById.mockRejectedValue(new Error(errorMessage));

    await authorizeHabitOwner(mockReq, mockRes, mockNext);

    expect(Habit.findById).toHaveBeenCalledWith('habitId123');
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Server error during authorization' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
