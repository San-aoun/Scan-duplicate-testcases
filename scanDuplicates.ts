// Import necessary modules
import * as XLSX from 'xlsx';

// Interface to hold title with its corresponding ID
interface TitleWithID {
    id: string;
    title: string;
}

// Function to read titles and IDs from an Excel file
function readTitlesFromExcel(filePath: string): TitleWithID[] {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];

    // Log the entire data read from the worksheet
    console.log(`Data from ${filePath}:`, data);

    // Assuming titles are in a column named "title" and IDs in a column named "id"
    const headerRow = data[0];
    const idIndex = headerRow.indexOf("ID");
    const titleIndex = headerRow.indexOf("Title");
    if (idIndex === -1 || titleIndex === -1) {
        throw new Error("ID or Title column not found");
    }

    // Extract titles and IDs, and log them
    const titlesWithID = data.slice(1).map(row => ({
        id: row[idIndex],
        title: row[titleIndex]
    })).filter(item => item.id !== undefined && item.title !== undefined);

    console.log(`Titles with IDs from ${filePath}:`, titlesWithID);

    return titlesWithID;
}

// Function to scan for duplicate titles using keywords
function scanForDuplicates(titlesWithID: TitleWithID[], keywords: string[]): { [key: string]: TitleWithID[] } {
    const duplicates: { [key: string]: TitleWithID[] } = {};

    keywords.forEach(keyword => {
        const matchedTitles = titlesWithID.filter(item => item.title.includes(keyword));
        if (matchedTitles.length > 1) {
            duplicates[keyword] = matchedTitles;
        }
    });

    return duplicates;
}

// Function to write duplicate titles to an Excel file
function writeDuplicatesToExcel(duplicates: { [key: string]: TitleWithID[] }, filePath: string): void {
    const workbook = XLSX.utils.book_new();

    Object.keys(duplicates).forEach((keyword) => {
        const worksheet = XLSX.utils.json_to_sheet(duplicates[keyword]);
        XLSX.utils.book_append_sheet(workbook, worksheet, keyword);
    });

    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getFullYear()).slice(-2)}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
    const fileName = `Duplicate_result_${formattedDate}_${formattedTime}.xlsx`

    XLSX.writeFile(workbook, fileName);
}

// Main function to execute the program
function main() {
    // Keywords to scan for
    const keywords: string[] = [
        'homepage', 
        'Workspace', 
        'Login', 
        'Layouts', 
        'Autosuggest', 
        'Context', 
        'Create', 
        'health'
    ]; // replace with actual keywords

    //-------------More Than 1 files --------------
    // Read titles and IDs from both Excel files
    // const titlesWithID1 = readTitlesFromExcel('./login.xlsx');
    // const titlesWithID2 = readTitlesFromExcel('./login2.xlsx');
    // Note : Combine titles and IDs from both files
    //const allTitlesWithID = [...titlesWithID1, ...titlesWithID2];
    

    //------------- 1 file --------------
    const titlesWithID1 = readTitlesFromExcel('./eikon_framework.xlsx');
    const allTitlesWithID = [...titlesWithID1];

    // Log combined titles and IDs
    console.log('Combined Titles with IDs:', allTitlesWithID);

    // Scan for duplicates using keywords
    const duplicates = scanForDuplicates(allTitlesWithID, keywords);

    // Log the results of the keyword scan
    console.log('Duplicate Titles:', duplicates);

    writeDuplicatesToExcel(duplicates, './duplicates_Result.xlsx')
}

// Run the main function
main();
