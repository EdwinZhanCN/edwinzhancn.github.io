import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown
from dotenv import load_dotenv
import os

def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


def translate(prompt, source_language, target_language):
    """
  Translates a prompt from one language to another using the Gemini API.

  Args:
    prompt: The text to translate.
    source_language: The language of the prompt.
    target_language: The language to translate the prompt to.

  Returns:
    The translated text.
  """

    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("who you are?")
    print(response.text)


# Example usage
load_dotenv(".env.secret")

# Get API key from environment variable
api_key = os.getenv('GOOGLE_API_KEY')

# Configure Gemini API with API key
genai.configure(api_key=api_key)

prompt = "你好，世界！"
source_language = "zh-CN"
target_language = "en"

translate(prompt, source_language, target_language)
