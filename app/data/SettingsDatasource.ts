import Suggestion, { DataType } from "../models/Suggestion";


interface DefaultSuggestions {
    flash_sale: Suggestion;
    suggested_content: Suggestion;
    fashion_content: Suggestion;
    other_content: Suggestion;
}

var suggestions : DefaultSuggestions;

const initSuggestions = () => {
    suggestions = {
        flash_sale: new Suggestion("Flash sales", "wants_flash_sales", true, DataType.Attribute),
        suggested_content: new Suggestion("Suggested Content", "wants_suggested_contant", true, DataType.Attribute),
        fashion_content: new Suggestion("Fashion", "fashion", true, DataType.Tag),
        other_content: new Suggestion("Other", "other", true, DataType.Tag),
    }
}



export { suggestions, initSuggestions };