import pandas as pd
import os
from dotenv import load_dotenv
import psycopg2

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

def read_file(file_name):
    df = pd.read_excel(file_name)
    return df

def flashcard_texts_upload(cardId, header, text, position, cur, conn):
    cur.execute("""
                    INSERT INTO flashcard_texts ("cardId", position, text_header, content)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (cardId, position, header, text)
        )
    conn.commit()

def flashcard_images_upload(cardId, header, image_file, cur, conn):
    image = image_file
    if image == "nan":
        image = ''
    cur.execute("""
                    INSERT INTO flashcard_images ("cardId", image_header, image_file)
                    VALUES (%s, %s, %s)
                    """,
                    (cardId, header, image)
        )
    conn.commit()
    
def flashcard_audio_upload(cardId, header, audio_file, cur, conn):
    audio = audio_file
    if audio == "nan":
        audio = ''
    cur.execute("""
                    INSERT INTO flashcard_audios ("cardId", audio_header, audio_file)
                    VALUES (%s, %s, %s)
                    """,
                    (cardId, header, audio)
        )
    conn.commit()
        
def core2k_upload(df, conn, cur):
    
    cur.execute("""
                INSERT INTO decks (name, description, author, premade)
                VALUES(%s, %s, %s,  %s)
                """,
                ('Core2.3k', 'A large and extensive vocabulary list for japanese students with text  images and  audio.\n "If you’re just starting to learn Japanese it may be a little overwhelming to jump straight into reading native content. Learning a list of common words can ease you into reading more efficiently. NOTE: Do not worry about the example sentences, just learn the words. The sentences are there to help you learn the word but if you can’t read them then please ignore them." - Author Note', 'Anacreon by DJT', True )
                )
    
    conn.commit()
    
    for index,  row in df.iterrows():
        question = row['Word']
        reading = row['Reading']
        glossary = row['Glossary']
        sentence = row['Sentence'].replace("<b>", '').replace('</b>', '')
        sentence_english = row['Sentence-English']
        image = str(row['Picture']).replace('<img src="', '').replace('" />', '')
        audio = str(row['Audio']).replace('[sound:', '').replace(']', '')
        sentence_audio = str(row['Sentence-Audio']).replace('[sound:', '').replace(']', '')
        deck =  1
        print('Creating flashcard')
        print(row)
        cur.execute("""
                    INSERT INTO flashcards ("deckId", question, card_order)
                    VALUES (%s, %s, %s)
                    """,
                    (deck, question, index + 1)
        )
        conn.commit()
        flashcard_texts_upload(index + 1, 'Reading:', reading, 0, cur, conn)
        flashcard_texts_upload(index + 1, 'Glossary:', glossary, 1, cur, conn)
        flashcard_texts_upload(index + 1, 'Sentence:', sentence, 2, cur, conn)
        flashcard_texts_upload(index + 1, 'Sentence  English:', sentence_english, 3, cur, conn)
        flashcard_images_upload(index + 1, "Image: ", image, cur,conn)
        flashcard_audio_upload(index + 1, "Word Audio", audio, cur,conn)
        flashcard_audio_upload(index + 1, "Sentence Audio", sentence_audio, cur,conn)

def hiragana_upload(df, conn, cur):
    cur.execute("""
                INSERT INTO decks (name, description, author, premade)
                VALUES(%s, %s, %s,  %s)
                """,
                ('Hiragana', 'Master 46 basic hiragana with illustration-based mnemonics and audio. This deck also includes subdecks covering variation hiragana, such as dakuten (like が) and combination kana (like にゅ)', 'Tofugu', True))
    
    conn.commit()
    
    for index, row in df.iterrows():
        question = row['Kana']
        romaji = str(row['Romaji'])
        image = str(row['Mnemonic Image']).replace('<img src="', '').replace('">', '')
        text = str(row['Mnemonic Text']).replace('<u>', '').replace('</u>', '').replace('<br>', '').replace('</br>', '')
        audio = str(row['Audio']).replace('[sound:', '').replace(']', '')
        deck =  2
        print('Creating flashcard')
        print(row)
        cur.execute("""
                    INSERT INTO flashcards ("deckId", question, card_order)
                    VALUES (%s, %s, %s)
                    """,
                    (deck, question, index + 1)
        )
        conn.commit()
        flashcard_texts_upload(index + 1973, "Romaji: ", romaji, 0, cur, conn)
        flashcard_texts_upload(index + 1973, "Mnemonic Text: ",  text, 1,cur, conn)
        flashcard_images_upload(index + 1973, "Mnemonic Image: ", image, cur,conn)
        flashcard_audio_upload(index + 1973, "Audio", audio, cur,conn)
        
def main():
    conn = psycopg2.connect(dbname=os.environ.get('DB_DATABASE'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), host=os.environ.get('DB_HOST'))
    cur = conn.cursor()    
    
    core_2k_df = read_file('corexl.xlsx')
    hiragana_df = read_file('Hiragana.xlsx')
    core2k_upload(core_2k_df, conn, cur)
    hiragana_upload(hiragana_df, conn, cur)
    cur.close
    conn.close

if __name__ == '__main__' :
    main()