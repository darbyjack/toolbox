import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Reader, TypedArray, unzip} from 'unzipit';
import {useState} from "react";
const { v4: uuidv4 } = require('uuid');

const Home: NextPage = () => {

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [displayData, setDisplayData] = useState<string[]>([])

  const yaml = require('js-yaml');

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    readFiles(selectedFile);
  };

  async function readFiles(url: any) {
    const {entries} = await unzip(url);

    const blob = await entries['plugin.yml'].blob('text/yaml');
    const text = await blob.text();
    const loaded = yaml.load(text);
    for (const permission in loaded.permissions) {
      setDisplayData(old => [...old, permission])
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <input type="file" name="file" accept=".jar" onChange={changeHandler} />
          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>
        </div>
        {displayData.map((data: string) => {
          return (          <li key ={uuidv4()} style={{listStyleType: "none"}}>
            {data}
          </li>)
        })}
      </main>
    </div>
  )
}

export default Home
