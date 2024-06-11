import open_ai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  //   const chatCompletion = await open_ai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: "What is the population of Chicago?" }],
  //   });

  //   console.log(chatCompletion);
  console.log(colors.bold.green("Welcome to the Chatbot Program"));
  console.log(colors.bold.green("You can start chatting with the bot."));

  const history = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      // Constructing messages based on history
      const messages = history.map(([role, content]) => ({ role, content }));

      messages.push({ role: 'user', content: userInput});

      // Call API given user input
      const result = await open_ai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      // Get completion content
      const resultToReturn = result.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + resultToReturn);
        return;
      }
      console.log(colors.green("Bot: ") + resultToReturn);

      // Also want to update history with the response and userInput
      history.push(['user', userInput]);
      history.push(['assistant', resultToReturn]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
