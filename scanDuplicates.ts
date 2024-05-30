// Import necessary modules
import * as XLSX from 'xlsx';

// Function to read titles from an Excel file
function readTitlesFromExcel(filePath: string): string[] {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];

    // Log the entire data read from the worksheet
    console.log(`Data from ${filePath}:`, data);

    // Assuming titles are in a column named "title"
    const headerRow = data[0];
    const titleIndex = headerRow.indexOf("title");
    if (titleIndex === -1) {
        throw new Error("Title column not found");
    }

    // Extract titles and log them
    const titles = data.slice(1).map(row => row[titleIndex]).filter(title => title !== undefined && title !== null);
    console.log(`Titles from ${filePath}:`, titles);

    return titles;
}

// Function to scan for duplicate titles
function scanForDuplicates(titles: string[], keywords: string[]): { [key: string]: string[] } {
    const duplicates: { [key: string]: string[] } = {};

    keywords.forEach(keyword => {
        const matchedTitles = titles.filter(title => title.includes(keyword));
        if (matchedTitles.length > 1) {
            duplicates[keyword] = matchedTitles;
        }
    });

    return duplicates;
}

// Main function to execute the program
function main() {
    // Keywords to scan for
    const keywords: string[] = ['home', 'signin', 'login', 'web site', 'page']; // replace with actual keywords

    // Read titles from both Excel files
    const titles1 = readTitlesFromExcel('./login.xlsx');
    const titles2 = readTitlesFromExcel('./login2.xlsx');

    // Combine titles from both files
    const allTitles = [...titles1, ...titles2];

    // Log combined titles
    console.log('Combined Titles:', allTitles);

    // Scan for duplicates
    const duplicates = scanForDuplicates(allTitles, keywords);

    // Output the results
    console.log('Duplicate Titles:', duplicates);
}

// Run the main function
main();