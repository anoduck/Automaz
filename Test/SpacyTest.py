import spacy

nlp = spacy.load("en")



def print_doc_info(doc):
    for token in doc:
        print(token.text)


    for ent in doc.ents:
        print(ent.label_, ent.text, ent.start_char)



doc1 = nlp("open all links on http://www.google.com")
doc2 = nlp("open files in folder")

doc3 = nlp("open 4 files in three folder")
doc4 = nlp("show me Feburary 10 2016")



doc = nlp("open all links on c:\\www\\great folder")

print_doc_info(doc4)


print(doc.similarity(doc1))
print(doc.similarity(doc2))

