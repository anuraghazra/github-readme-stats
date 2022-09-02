import fs from 'fs';
import jsYaml from 'js-yaml';
import axios from 'axios';

const LANGS_FILEPATH = "./src/common/languageColors.json"

//Retrieve languages from github linguist repository yaml file
//@ts-ignore
axios.get("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml")
.then((response) => {

  //and convert them to a JS Object
  const languages = jsYaml.load(response.data);

  const languageColors = {};

  //Filter only language colors from the whole file
  Object.keys(languages).forEach((lang) => {
    languageColors[lang] = languages[lang].color;
  });

  //Debug Print
  //console.dir(languageColors);
  fs.writeFileSync(LANGS_FILEPATH, JSON.stringify(languageColors, null, '    '));
  
});
