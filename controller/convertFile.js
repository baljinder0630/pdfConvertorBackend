import docxToPDF from 'docx-pdf';
import path from 'path';
import fs from 'fs/promises';
import { encrypt } from 'node-qpdf2';
const __dirname = path.resolve();

const convertFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const inputPath = req.file.path;
        const outputPath = path.join(__dirname, "files", `${req.file.filename}.pdf`);
        const password = req.body.password;

        // Convert DOCX to PDF
        docxToPDF(inputPath, outputPath, async (err) => {
            if (err) {
                console.error("Error converting DOCX to PDF:", err);
                return res.status(500).json({ message: "Error converting DOCX to PDF" });
            }

            // Encrypt the PDF if a password is provided
            if (password) {
                try {
                    const options = {
                        input: outputPath,
                        output: outputPath,
                        keyLength: 256,
                        password: password,
                    };

                    // Ensure `encrypt` supports async/await or handle callbacks properly
                    await encrypt(options);
                } catch (encryptErr) {
                    console.error("Error encrypting PDF:", encryptErr);
                    return res.status(500).json({ message: "Error encrypting PDF" });
                }
            }

            // Download the file
            res.download(outputPath, async (downloadErr) => {
                if (downloadErr) {
                    console.error("Error during file download:", downloadErr);
                } else {
                    console.log("File downloaded successfully");
                }

                // Clean up the generated PDF
                try {
                    await fs.unlink(outputPath);
                    console.log("Converted PDF deleted successfully");
                } catch (unlinkErr) {
                    console.error("Error deleting converted PDF:", unlinkErr);
                }
            });

            // Clean up the uploaded DOCX
            try {
                await fs.unlink(inputPath);
                console.log("Uploaded DOCX deleted successfully");
            } catch (unlinkErr) {
                console.error("Error deleting uploaded DOCX:", unlinkErr);
            }
        });
    } catch (error) {
        console.error("Internal server error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default convertFile;
