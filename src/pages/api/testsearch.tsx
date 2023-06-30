import db from "@/db/db";
import natural, { TfIdf, WordNet } from 'natural';
import stringSimilarity from 'string-similarity';
import { Request, Response } from "express";
import { searchService } from "@/services/searchService";
import { MysqlError } from "mysql";
import fs from 'fs';
export default function handler(req: Request, res: Response) {
    if (req.method === 'POST') {

        const userInput = 'example';

        // Create an instance of WordNet
        const wordnet = new WordNet();
        wordnet.lookup(userInput, (err, definitions) => {
            if (err) {
                reject(err);
            } else {
                const similarWords = definitions.reduce((words, definition) => {
                    definition.synonyms.forEach((synonym) => {
                        if (!words.includes(synonym)) {
                            words.push(synonym);
                        }
                    });
                    return words;
                }, []);
                resolve(similarWords);
            }
        });
        // intelligentSearch(req, res, req.body.search);
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}

async function intelligentSearch(req: Request, res: Response, userInput: string) {


    db.query('SELECT keyword FROM keywords', (err, results) => {
        if (err) {
            console.error('Error executing search query:', err);
            return;
        }
        const relevantKeywords = results.map(result => result.keyword);
        const matches = stringSimilarity.findBestMatch(userInput, relevantKeywords);
        const matchedKeywords = matches.ratings.filter((match) => match.rating > 0.7).map((match) => match.target);
        console.log(matchedKeywords)
        if (matchedKeywords.length === 0) {
            res.status(204).json([]);
            return;
        }
        // Query the database for matching records
        const searchQuery = `
            SELECT * FROM products
            WHERE product LIKE '%${matchedKeywords.join("%' OR product LIKE '%")}%' LIMIT 10
          `;
        db.query(searchQuery, (err, results) => {
            if (err) {
                console.error('Error executing search query:', err);
                return;
            }

            // Process and display the search results
            console.log('Search Results:');
            results.forEach((result) => {
                console.log(result);
            });
            return res.status(200).json(results)
        });
    });
    // const tokenizer = new natural.WordTokenizer();
    // const query = 'SELECT product FROM products';
    // db.query(query, (error: MysqlError | null, rows: { product: string }[]) => {
    //     if (error) {
    //         console.error('Error retrieving data from the database:', error);
    //         return;
    //     }
    //     console.log("COUNT: " + rows.length)
    //     // Extract keywords using TF-IDF
    //     const tfidf = new TfIdf();
    //     rows.forEach((row) => {
    //         const descriptionTokens = tokenizer.tokenize(row.product);
    //         const addToDoc = descriptionTokens ? descriptionTokens.join(' ') : '';
    //         tfidf.addDocument(addToDoc);
    //     });
    //     console.log(tfidf.listTerms(0))
    //     for (let i = 0; i < tfidf.documents.length; i++) {
    //         const terms = tfidf.listTerms(i);

    //         terms.forEach((term) => {
    //             relevantKeywords.push(term.term);
    //             console.log("relevant keywords: " + term.term);
    //         });
    //     }
    //     fs.writeFile('output.txt', relevantKeywords.join('\r\n'), (err) => {
    //         if (err) {
    //             console.error('Error writing to file:', err);
    //         } else {
    //             console.log('Output has been written to output.txt');
    //         }
    //     });
    //     const matches = stringSimilarity.findBestMatch(userInput, relevantKeywords);
    //     console.log(matches)
    //     const matchedKeywords = matches.ratings.filter((match) => match.rating > 0.5).map((match) => match.target);
    //     if (matchedKeywords.length === 0) {
    //         res.status(204).json([]);
    //         return;
    //     }
    //     // Query the database for matching records
    //     const searchQuery = `
    //         SELECT * FROM products
    //         WHERE product LIKE '%${matchedKeywords.join("%' OR product LIKE '%")}%' LIMIT 10
    //       `;
    //     db.query(searchQuery, (err, results) => {
    //         if (err) {
    //             console.error('Error executing search query:', err);
    //             return;
    //         }

    //         // Process and display the search results
    //         console.log('Search Results:');
    //         results.forEach((result) => {
    //             console.log(result);
    //         });
    //         return res.status(200).json(results)
    //     });
    // });
}

