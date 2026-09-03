import glob
from pypdf import PdfReader
for file in glob.glob("*.pdf"):
    reader = PdfReader(file)
    text = "".join(page.extract_text() for page in reader.pages)
    print(text)
