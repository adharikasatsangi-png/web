document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("gradeButton").addEventListener("click", function() {
        calculateGrade();
    });
});

function calculateGrade() {
    let current_total_weighted_sum = 0.0;
    let current_total_weightage = 0.0;

    let total_marks = parseFloat(prompt("Enter the total marks of the course:"));
    let total_number_of_exams_taken = parseInt(prompt("Enter the total number of exams you already have grades for:"), 10);
    let total_number_of_exams = parseInt(prompt("Enter the total number of exams in the course:"), 10);

    for (let i = 1; i <= total_number_of_exams_taken; i++) {
        let grade = parseFloat(prompt(`Enter your grade for exam ${i}:`));
        let weightage = parseFloat(prompt(`Enter the percent weightage of exam ${i}:`));
        current_total_weighted_sum += grade * (weightage / 100);
        current_total_weightage += weightage;
    }

    let desired_final_grade = parseFloat(prompt("Enter your desired final grade (%):"));
    let weightage_left = 100 - current_total_weightage;

    if (weightage_left <= 0) {
        alert("No exams left to improve your grade.");
        return;
    }

    let weighted_sum_needed = desired_final_grade;
    let weighted_sum_yet_to_obtain = weighted_sum_needed - current_total_weighted_sum;
    let average_percentage_needed = weighted_sum_yet_to_obtain / (weightage_left / 100);

    if (average_percentage_needed > 100) {
        alert("It's not possible to achieve the desired final grade.");
    } else if (average_percentage_needed < 0) {
        alert("You’ve already achieved your desired final grade!");
    } else {
        alert(`You need to score an average of ${average_percentage_needed.toFixed(2)}% on remaining exams to achieve your goal.`);
    }

    let highest_possible_grade = current_total_weighted_sum + (100 * (weightage_left / 100));
    alert(`The highest possible final grade you can achieve is ${highest_possible_grade.toFixed(2)}%`);
}
function calculatePercentage() {
    const totalMarks = parseFloat(document.getElementById("total_marks").value);
    const totalExams = parseInt(document.getElementById("total_exams").value, 10);
    const totalExamsTaken = parseInt(document.getElementById("total_exams_taken").value, 10);
    
    if (isNaN(totalMarks) || isNaN(totalExams) || isNaN(totalExamsTaken) || totalExamsTaken > totalExams) {
        alert("Please enter valid numbers.");
        return;
    }
    /*I think I can add more code here for specific messages based or specific invalid input*/

    let percentages =[];
    for (let i = 1; i <= totalExams; i++) {
        let inputType = prompt(`For ${i}, do you want to enter marks or percentage? (Enter 'marks' or 'percentage'):`).toLowerCase();}
    for (let i = 1; i <= totalExamsTaken; i++) {
        let marksObtained = parseFloat(prompt(`Enter marks obtained in exam ${i}:`));
        let examTotalMarks = parseFloat(prompt(`Enter total marks for exam ${i}:`));}

    for (let i = 1; i <= totalExamsTaken; i++) {
        const p = Number(prompt(`What was your percentage for exam ${i}?`));
        percentages.push(p);}
    }
function generate_exam_boxes() {
    const totalMarks = parseFloat(document.getElementById("total_marks").value);
    const totalExams = parseInt(document.getElementById("total_exams").value, 10);
    const totalExamsTaken = parseInt(document.getElementById("total_exams_taken").value, 10);
    const container = document.getElementById("examContainer");
    container.innerHTML = "";

     if (isNaN(totalMarks) || isNaN(totalExams) || isNaN(totalExamsTaken) || totalExamsTaken > totalExams) {
        alert("Please enter valid numbers.");
        return;
    }
    /*I think I can add more code here for specific messages based or specific invalid input*/

    for (let i = 1; i <= total; i++) {
    const div = document.createElement("div");
    div.classList.add("exam-box");
    div.innerHTML = `
      <h3>Exam ${i}</h3>
      <label>Do you prefer to give marks or percentage?</label>
      <select onchange="showInputs(this, ${i})">
        <option value="">--Select--</option>
        <option value="marks">Marks</option>
        <option value="percentage">Percentage</option>
      </select>
      <div id="exam${i}Inputs"></div>
    `;
    container.appendChild(div);
  } 
}
function showInputs(select, index) {
  const container = document.getElementById(`exam${index}Inputs`);
  container.innerHTML = ""; // clear previous fields

  if (select.value === "marks") {
    container.innerHTML = `
      <label>Marks obtained:</label>
      <input type="number" id="marksObtained${index}" step="0.01"><br>
      <label>Total marks:</label>
      <input type="number" id="totalMarks${index}" step="0.01"><br>
    `;
  } else if (select.value === "percentage") {
    container.innerHTML = `
      <label>Percentage:</label>
      <input type="number" id="percentage${index}" step="0.01"><br>
    `;
  }
}

