import db from '@/db/db';
import { MysqlError } from 'mysql';
import natural, { TfIdf } from 'natural';
export class searchService {
    static relevantKeywords: string[] = [];
    constructor() {
        const tokenizer = new natural.WordTokenizer();
        const query = 'SELECT product FROM products LIMIT 8000, 1000';
        db.query(query, (error: MysqlError | null, rows:{product:string}[]) => {
            if (error) {
                console.error('Error retrieving data from the database:', error);
                return;
            }

            // Extract keywords using TF-IDF
            const tfidf = new TfIdf();
            rows.forEach((row) => {
                const descriptionTokens = tokenizer.tokenize(row.product);
                const addToDoc = descriptionTokens ? descriptionTokens.join(' ') : '';
                tfidf.addDocument(addToDoc);
            });
            tfidf.listTerms(0).forEach((term) => {
                searchService.relevantKeywords.push(term.term);
                console.log("aaa"+term.term)
            });
        });
    }
}
