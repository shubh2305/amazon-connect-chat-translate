import  { Predictions} from '@aws-amplify/predictions';
import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";

const translateText = async (text, sourceLang, targetLang) => {
    const client = new TranslateClient();
    const params = {
        Text: text,
        SourceLanguageCode: sourceLang,
        TargetLanguageCode: targetLang,
        Settings: {
            Formality: "FORMAL",
        },
    };
    try {
        const command = new TranslateTextCommand(params);
        const response = await client.send(command);
        return response.TranslatedText;
    } catch (error) {
        console.error("Translation error: ", error);
        throw error;
    }
};

async function ProcessChatText(content, sourceLang, tagretLang) {

    let transcriptMessage = await Predictions.convert({
        translateText: {
            source: {
                text: content,
                language: sourceLang, // defaults configured on aws-exports.js
                // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
            },
            targetLanguage: tagretLang
        }
    });
    const translatedMessage = await translateText(content, sourceLang, tagretLang)
    console.log("TJ Translation: ", translatedMessage);
    return transcriptMessage.text
}
export default ProcessChatText
