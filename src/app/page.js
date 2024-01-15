"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "flowbite";

export default function Home() {
  const [languages, setLanguages] = useState([]);

  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [languageDict, setLanguageDict] = useState({});

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://libretranslate.de/languages');
        const dict = {};
        setLanguages(response.data);
        response.data.forEach((language) => {
          dict[language.code] = language.name;
        });
        setLanguageDict(dict);
      } catch (error) {
        console.error('Failed to fetch languages', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleTextChange = async (event) => {
    const text = event.target.value;
    setText(text);
    setCharCount(text.length);

    if (text) {
      try {
        const response = await axios.post('https://libretranslate.de/detect', { q: text });
        if (response.data && response.data.length > 0) {
          setDetectedLanguage(response.data[0].language);
          setSelectedLanguage(response.data[0].language);
        }
      } catch (error) {
        console.error('Failed to detect language', error);
      }
    } else {
      setDetectedLanguage('');
      setSelectedLanguage('es');
    }
  };

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  const [activeTargetLanguage, setActiveTargetLanguage] = useState('');
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState('Spanish');

  const handleTargetButtonClick = (languageCode, languageName) => {
    setActiveTargetLanguage(languageCode);
    if (languageName) {
      setSelectedTargetLanguage(languageName);
    }
  };

  

  return (
    <>
      <div>
        <img className="h-[50vh] w-[100%]" src="../hero_img.jpg"></img>
      </div>

      <div className="flex justify-center -mt-[250px]">
        <img src="../assets/logo.svg"></img>
      </div>

      {/* Detected Language */}

      <div className="flex flex-row justify-center gap-6 mt-[80px]">
        <div className="w-[40%] h-[55vh] bg-[#212936cc] border rounded-xl border-[#4D5562] p-5">
          <div className="pb-3 flex flex-row gap-4">
            <p className="font-bold text-[#4D5562] p-1">Detect Language</p>
            <button className={`rounded-lg font-medium text-[#4D5562] ${detectedLanguage === 'en' ? 'active' : ''}`}>
              English
            </button>
            <button className={`rounded-lg font-medium text-[#4D5562] ${detectedLanguage === 'fr' ? 'active' : ''}`}>
              French
            </button>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className={`text-[#4D5562] rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center ${selectedLanguage || selectedLanguage === detectedLanguage ? 'active' : ''}`}
            >{languageDict[selectedLanguage]}
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              class={`z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 `}
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {languages.map((language) => (
                <li key={language.code} value={language.code} selected={language.code === selectedLanguage}>
                  <button
                    onClick={() => handleLanguageSelect(language.code)}
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >{language.name}</button>
                </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-[#394150]"></hr>

          <div className="mt-5">
            <textarea
              className="resize-none text-base text-justify text-wrap text-[#F9FAFB] font-medium p-2 bg-transparent w-[36.5vw] h-[24vh]"
              onChange={handleTextChange}
          maxLength={500}
            ></textarea>
          </div>

          <p className="text-[#4D5562] text-sm text-right">{charCount}/500</p>

          <div className="flex flex-row items-center pt-2 gap-2">
            <div>
              <button className="w-[30px] p-1 border-2 border-[#4D5562] rounded-lg">
                <img src="../assets/sound_max_fill.svg"></img>
              </button>
            </div>
            <div>
              <button className="w-[30px] p-1 border-2 border-[#4D5562] rounded-lg">
                <img src="../assets/Copy.svg"></img>
              </button>
            </div>
            <div className="ml-[14rem] text-center text-base font-bold text-[#F9FAFB]">
              <button className="w-[150px] h-[40px] border-1 rounded-lg border-[#CDD5E0] bg-[#3662E3]">
                <img
                  className="inline-block"
                  src="../assets/Sort_alfa.svg"
                ></img>
                Translate
              </button>
            </div>
          </div>
        </div>

        {/* End of Detected Language */}


        {/* Target Language */}

        <div className="w-[40%] h-[55vh] bg-[#121826cc] border rounded-xl border-[#4D5562] p-5">
          <div className="pb-3 flex flex-row gap-4">
            <button className={`rounded-lg font-medium text-[#4D5562] ${activeTargetLanguage === 'en' ? 'active' : ''}`} onClick={() => handleTargetButtonClick('en')}>
              English
            </button>
            <button className={`rounded-lg font-medium text-[#4D5562] ${activeTargetLanguage === 'fr' ? 'active' : ''}`} onClick={() => handleTargetButtonClick('fr')}>
              French
            </button>
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown2"
              className={`text-[#4D5562] rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center ${activeTargetLanguage === 'dropdown' ? 'active' : ''}`}
              type="button"
              onClick={() => handleTargetButtonClick('dropdown')}
            >{selectedTargetLanguage}
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown2"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownButton"
              >
                {languages.map((language) => (
                <li key={language.code} value={language.code}>
                  <button
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleTargetButtonClick(language.code, language.name)}
                  >{language.name}</button>
                </li>
                ))}
              </ul>
            </div>

            <div>
              <button className="ml-[8rem] w-[30px] p-1 border-2 border-[#4D5562] rounded-lg">
                <img src="..\assets\Horizontal_top_left_main.svg"></img>
              </button>
            </div>
          </div>

          <hr className="border-[#394150]"></hr>

          <div className="mt-5">
            <textarea
              className="disabled resize-none text-base text-justify text-wrap text-[#F9FAFB] font-medium p-2 bg-transparent w-[36.5vw] h-[24vh]"
              disabled
              value=""
            ></textarea>
          </div>

          <div className="flex flex-row items-center pt-8 gap-2">
            <div>
              <button className="w-[30px] p-1 border-2 border-[#4D5562] rounded-lg">
                <img src="../assets/sound_max_fill.svg"></img>
              </button>
            </div>
            <div>
              <button className="w-[30px] p-1 border-2 border-[#4D5562] rounded-lg">
                <img src="../assets/Copy.svg"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
