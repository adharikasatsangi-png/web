const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => readline.question(query, ans => resolve(ans)));
}

(async function() {
    let current_total_weighted_sum = 0.0; // The total weighted sum of the exams already taken
    let current_total_weightage = 0.0; // The total weightage of the exams already taken

    let total_marks = parseFloat(await askQuestion("Enter the total marks of the course: "));
    let total_number_of_exams_taken = parseInt(await askQuestion("Enter the total number of exams you already have grades available for: "), 10);
    let total_number_of_exams = parseInt(await askQuestion("Enter the total number of exams in the course: "), 10);

    if (total_number_of_exams <= 0) {
        console.log("Invalid number of exams.");
        readline.close();
        return 1;
    }

    if (total_number_of_exams > 0) {
        let grade1 = parseFloat(await askQuestion("Enter your grade for the 1st exam: "));
        let weightage1 = parseFloat(await askQuestion("Enter the percent weightage of this exam: "));
        current_total_weighted_sum += grade1 * ((weightage1 / 100) * total_marks) / 100.0;
        current_total_weightage += weightage1;
    }

    if (total_number_of_exams > 1) {
        let grade2 = parseFloat(await askQuestion("Enter your grade for the 2nd exam: "));
        let weightage2 = parseFloat(await askQuestion("Enter the percent weightage of this exam: "));
        current_total_weighted_sum += grade2 * ((weightage2 / 100) * total_marks) / 100.0;
        current_total_weightage += weightage2;
    }

    if (total_number_of_exams > 2) {
        let grade3 = parseFloat(await askQuestion("Enter your grade for the 3rd exam: "));
        let weightage3 = parseFloat(await askQuestion("Enter the percent weightage of this exam: "));
        current_total_weighted_sum += grade3 * ((weightage3 / 100) * total_marks) / 100.0;
        current_total_weightage += weightage3;
    }

    if (total_number_of_exams > 3) {
        for (let i = 4; i <= total_number_of_exams_taken; i++) {
            let grade = parseFloat(await askQuestion(`Enter your grade for the ${i}th exam: `));
            let weightage = parseFloat(await askQuestion(`Enter the percent weightage of ${i}th exam: `));
            current_total_weighted_sum += grade * ((weightage / 100) * total_marks) / 100.0;
            current_total_weightage += weightage;
        }
    }

    let desired_final_grade = parseFloat(await askQuestion("Enter your desired final grade: "));
    let weighted_sum_needed = (desired_final_grade / 100.0) * total_marks;
    let weighted_sum_yet_to_obtain = weighted_sum_needed - current_total_weighted_sum;
    let number_of_exams_left = total_number_of_exams - total_number_of_exams_taken;
    let weightage_left = 100.0 - current_total_weightage;
    let total_weighted_sum_to_score = weightage_left * total_marks / 100.0; // The total weighted sum that can be obtained

    if (number_of_exams_left <= 0 || weightage_left <= 0) {
        console.log("No exams left to improve your grade.");
        readline.close();
        return 1;
    } else {
        let average_percentage_needed = (weighted_sum_yet_to_obtain / total_weighted_sum_to_score) * 100.0;
        if (average_percentage_needed > 100.0) {
            console.log("It's not possible to achieve the desired final grade with the remaining exams.");
        } else if (average_percentage_needed < 0.0) {
            console.log("You have already achieved the desired final grade.");
        } else {
            console.log(`You need to score an average of ${average_percentage_needed.toFixed(2)}% on the remaining exams to achieve your desired final grade.`);
        }
    }

    let highest_possible_grade = (current_total_weighted_sum + total_weighted_sum_to_score) / total_marks * 100.0;
    console.log(`The highest possible final grade you can achieve is ${highest_possible_grade.toFixed(2)}%`);

    readline.close();
})();