import React from 'react';

const GoalTracker = ({ goal, progress }) => {
  const reached = progress <= 0;
  return (
    
    <div className="goal-tracker">
      <h3>Goal Tracking</h3>
      <p>
  <span style={{ color: 'green' }}>Target:</span> ₹{goal}
</p>
<p>
  <span style={{ color: 'red'}}>
    Remaining:
  </span> ₹{progress > 0 ? progress : 0}
</p>

      {reached && <p className="success">🎯 You've reached your goal!</p>}
    </div>
  );
};

export default GoalTracker;