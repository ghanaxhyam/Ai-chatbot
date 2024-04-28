import google.generativeai as genai
#I've added the comments ;)
# Hardcoded API key (
api_key = "I hardcoded the API key you can do it too if you are newbie"
genai.configure(api_key=api_key)

# Set up the model parameters
generation_config = {
  "temperature": 0.25,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

# Safety settings with minimal restrictions
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_NONE"
  },
]

# Initialize the generative model
model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

#... Rest of your chatbot code...
def get_chatbot_response(user_message):
    prompt_parts = [
      "input: " + user_message,
      "output: ",
    ]
    try: 
        response = model.generate_content(prompt_parts)
        print("Bot Response Generated:", response.text)  
        return response.text
    except Exception as e:
        print(f"Error in generating response: {e}") 
        return "Error: Couldn't get bot response." # Placeholder for now


# Main chatbot loop (same as before)
if __name__ == "__main__":
  print("Chatbot ready!")
  while True:
    try:
      user_input = input("You: ")
      bot_response = get_chatbot_response(user_input)
      print("Bot: " + bot_response)
    except Exception as e:
      print(f"An error occurred: {e}. Please try again.")
