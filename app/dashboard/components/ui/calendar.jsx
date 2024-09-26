import React, { useState } from 'react';
import { Edit, Trash } from 'lucide-react'; // Import icons from lucide-react

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({}); // Store tasks by date
  const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
  const [editingTask, setEditingTask] = useState(''); // Store the task being edited

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
    setSelectedDate(dateString);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && task) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDate]: [...(prevTasks[selectedDate] || []), task],
      }));
      setTask('');
      setSelectedDate(null); // Deselect after adding task
    }
  };

  const handleEditTask = (index) => {
    if (tasks[selectedDate] && tasks[selectedDate][index]) {
      setEditingTask(tasks[selectedDate][index]);
      setEditIndex(index);
    }
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (selectedDate && editingTask) {
      const updatedTasks = [...(tasks[selectedDate] || [])];
      updatedTasks[editIndex] = editingTask; // Update the specific task
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDate]: updatedTasks,
      }));
      setEditingTask('');
      setEditIndex(null);
    }
  };

  const handleRemoveTask = (index) => {
    if (tasks[selectedDate]) {
      const updatedTasks = tasks[selectedDate].filter((_, i) => i !== index);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDate]: updatedTasks,
      }));
    }
  };

  const renderDaysInMonth = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Fill the first week with empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="border p-2 text-center"></div>);
    }
    // Fill the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      const isSelected = selectedDate === new Date(year, month, day).toDateString();
      days.push(
        <div
          key={day}
          className={`border p-2 text-center cursor-pointer ${isToday ? 'bg-blue-200' : ''} ${isSelected ? 'bg-green-200' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {tasks[new Date(year, month, day).toDateString()] && (
            <div className="text-xs text-gray-500">
              {tasks[new Date(year, month, day).toDateString()].map((t, index) => (
                <div key={index} className="flex justify-between items-center group">
                  <span>{t}</span>
                  <div className="invisible group-hover:visible flex space-x-2">
                    <button onClick={() => handleEditTask(index)} className="text-blue-500">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleRemoveTask(index)} className="text-red-500">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-800">Prev</button>
        <h2 className="text-lg font-semibold">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {/* Days of the week */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold text-center">{day}</div>
        ))}
        {renderDaysInMonth()}
      </div>
      {selectedDate && (
        <form onSubmit={editIndex !== null ? handleUpdateTask : handleTaskSubmit} className="mt-4">
          <input
            type="text"
            value={editIndex !== null ? editingTask : task}
            onChange={(e) => editIndex !== null ? setEditingTask(e.target.value) : setTask(e.target.value)}
            placeholder="Enter task"
            className="border p-2 w-full"
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
            {editIndex !== null ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Calendar;
