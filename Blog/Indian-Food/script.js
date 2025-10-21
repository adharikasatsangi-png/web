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
