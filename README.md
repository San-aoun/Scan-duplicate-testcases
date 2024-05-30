Instructions to Run
Install Dependencies:
npm install xlsx typescript ts-node @types/node


Place Your Excel Files:
Ensure the login.xlsx and login2.xlsx files are in the same directory as your script.

Run the Script:
npx ts-node scanDuplicates.ts


Next Steps
a. Add more keywords to the keywords array and scan again.
b. Refine the keyword matching logic to use regex for more complex patterns.
