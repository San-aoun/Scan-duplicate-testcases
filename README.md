Instructions to Run
Install Dependencies:

bash
Copy code
npm install xlsx typescript ts-node @types/node
Create the TypeScript Configuration:

json
Copy code
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
Place Your Excel Files:
Ensure the login.xlsx and login2.xlsx files are in the same directory as your script.

Run the Script:

bash
Copy code
npx ts-node scanDuplicates.ts
Next Steps
a. Add more keywords to the keywords array and scan again.
b. Refine the keyword matching logic to use regex for more complex patterns.
