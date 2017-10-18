using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapanesePracticer
{
    class Decoder
    {
        //external file names
        public static const HIRAGANA_FILE = "hiragana.txt";
        public static const KATAKANA_FILE = "katakana.txt";
        
        //external files containing kana to romaji relations
        private static File hiraganaFile;
        private static File katakanaFile;
        
        //arrays containing kana for use in decoding
        private Hashtable hiragana;
        private Hashtable katakana;
        
        public Decoder() {
            //initialize files
            loadKanaArrays();
        }
        
        /**
            takes in a string of kana and returns a string of romaji
        */
        public string getRomaji(string input) {
        }
        
        private void loadKanaArrays() {
            //initialize files
            //load kana arrays from files
        }
        
    }
}
