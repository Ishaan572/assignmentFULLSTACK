

class Student{
    constructor(name, scores){
        this.name = name;
        this.scores = scores;
    }

    get average() {
    let sum = 0;
        for (let i = 0; i < this.scores.length; i++) {
            sum += this.scores[i];
        }
        return sum / this.scores.length;}


    get letterGrade() {
        const avg = this.average; 
        
        // Scale: A >= 80 | B >= 70 | C >= 50 | D >= 30 | F < 30
        if (avg >= 80) {
            return 'A';
        } else if (avg >= 70) {
            return 'B';
        } else if (avg >= 50) {
            return 'C';
        } else if (avg >= 30) {
            return 'D';
        } else {
            return 'F';
        }
    }    

    getRemark(grade) {
        switch (grade) {
            case 'A': return "Chaapa";
            case 'B': return "Good";
            case 'C': return "Average";
            case 'D': return "Borderline Pass";
            case 'F': return "Fakka";
            default:  return "Invalid grade.";
        }
    }

    printReport() {
        const status = this.average >=30 ? "PASS" : "FAIL";

        const [score1, score2, ...remaining] = this.scores;

        const highest  = this.summary().max;
        const lowest = this.summary().min;

        
        const reportCard = `

          STUDENT REPORT CARD

  Name:       ${this.name}
  Status:     ${status} - ${this.getRemark(this.letterGrade)}
-----------------------------------------
  Score Breakdown:
  - First:    ${score1}
  - Second:   ${score2}
  - Rest:   ${remaining.join(", ")}
-----------------------------------------
  Average:    ${this.average.toFixed(1)}
  Grade:      ${this.letterGrade}
  High/Low:   ${highest} / ${lowest}
=========================================
        `;
        
        console.log(reportCard);
    }

    summary() {
        let max  =  this.scores[0]; let min = this.scores[0];
        for (let i = 1; i < this.scores.length; i++) {
            if (this.scores[i] > max) {
                max = this.scores[i];
            }
            if (this.scores[i] < min) {
                min = this.scores[i];
            }
            
        }
        return { max, min };

    
    
            
}}


const [, , name, ...strScores] = process.argv;
const scores = strScores.map((score) => Number(score));
if (!name || scores.length < 3) {
    console.log(" Please provide at least 3 exam scores.");
    process.exit(1); 
}
const student = new Student(name, scores);
student.printReport();
