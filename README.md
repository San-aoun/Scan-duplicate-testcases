# Duplicate Title Scanner

This project scans two Excel files for duplicate titles based on a set of keywords. The results are written to a new Excel file.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository: 
git clone
2. Navigate into the project directory: 
cd
3. Install the dependencies: 
npm install xlsx typescript ts-node @types/node

## Usage

1. Place your Excel files (`login.xlsx` and `login2.xlsx`) in the project directory.
2. Run the script:
npx ts-node scanDuplicates.ts
3. The results will be written to `duplicates_Result.xlsx` in the project directory.

## Customization

- Add more keywords to the `keywords` array in `scanDuplicates.ts` to scan for additional patterns.
- Refine the keyword matching logic in `scanForDuplicates` function to use regex for more complex patterns.

![image](https://github.com/San-aoun/https---github.com-San-aoun-Scan-duplicate-test-case/assets/39735390/c6ca7d94-a50d-48ef-bfd0-f966a145b99f)

