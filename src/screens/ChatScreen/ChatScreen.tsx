import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {View, Text, Button, Pressable, Image} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {styles} from './styles';
import {getRecipeById, queryRecipeByName} from '../../utils/recipeApi';
import {
  fetchFromLocalStorage,
  getAllKeys,
  saveToLocalStorage,
} from '../../utils/storage';
import Voice from '@react-native-voice/voice';

const ChatScreen = (): ReactElement => {
  const [inputText, setInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [lastRecipeQuery, setLastRecipeQuery] = useState<any[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory.length]);

  const handleSend = () => {
    const trimmedValue: string = inputText?.trim();
    const regex = /[^A-Za-z0-9]/;
    if (!trimmedValue || regex.test(trimmedValue)) return;
    if (!isNaN(parseFloat(trimmedValue))) {
      handleNumericInput(parseInt(trimmedValue));
    } else {
      handleStringInput(trimmedValue);
    }
    setInputText('');
  };
  const handleNumericInput = async (input: number) => {
    const response: string = `Wrong input ${input}`;
    const allKeys: string[] = await getAllKeys();
    if (lastRecipeQuery.length > 0) {
      const recipeSelected: any[] = lastRecipeQuery.filter(
        (item: any) => item.index === input,
      );
      console.log(recipeSelected);
      if (recipeSelected?.length > 0) {
        let recipeData;
        if (allKeys?.includes?.(`dish-${recipeSelected?.[0]?.id}`)) {
          recipeData = await fetchFromLocalStorage(
            `dish-${recipeSelected?.[0]?.id}`,
          );
        } else {
          const recipeDict = await getRecipeById(recipeSelected?.[0]?.id);
          recipeData = recipeDict?.data;
          await saveToLocalStorage(
            `dish-${recipeSelected?.[0]?.id}`,
            recipeData,
          );
        }
        const startString: string = `You selected ${recipeSelected?.[0]?.title}\n\nIngredients for ${recipeSelected?.[0]?.title} : \n`;
        const endString: string = `\n\nPlease enter option:(0-9) or another recipe name \n`;
        const ingredientsText: string = recipeData?.extendedIngredients
          .map((recipe: any) => {
            return `${recipe.original}`;
          })
          .join('\n');

        updateChatHistory(
          `${input}`,
          startString +
            ingredientsText +
            '\n\n' +
            recipeData?.summary +
            endString,
        );
      } else {
        updateChatHistory(`${input}`, response);
      }
    } else {
      updateChatHistory(`${input}`, response);
    }
  };

  const handleStringInput = async (input: string) => {
    try {
      const allKeys: string[] = await getAllKeys();
      let recipeList;
      if (allKeys?.includes?.(input?.toLowerCase())) {
        recipeList = await fetchFromLocalStorage(input);
      } else {
        const recipeDict = await queryRecipeByName(input);
        recipeList = recipeDict?.data;
        await saveToLocalStorage(`${input}`, recipeList);
      }
      const parsedInput = recipeList;

      if (parsedInput?.results && Array.isArray(parsedInput?.results)) {
        const recipes = parsedInput?.results?.map(
          (recipe: any, index: number) => ({
            id: recipe?.id,
            title: recipe?.title,
            image: recipe?.image,
            index: index + 1,
          }),
        );

        if (recipes.length > 0) {
          setLastRecipeQuery(recipes);
          const startString: string = `These are some of the recipes for ${input}\n`;
          const endString: string = `\nPlease enter option:(0-9) or another recipe name\n`;
          const response = recipes
            .map((recipe: any) => {
              return `${recipe.index}. ${recipe.title}`;
            })
            .join('\n');

          updateChatHistory(input, startString + response + endString);
          return;
        }
      }
    } catch (error) {
      console.error('Error parsing input:', error);
    }
    updateChatHistory(input, 'Could not recognize input. Please try again.');
  };

  const updateChatHistory = (userMessage: string, botMessage: string) => {
    setChatHistory([
      ...chatHistory,
      `You: ${userMessage}`,
      `Chatbot: ${botMessage}`,
    ]);
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };
  const handleVoiceStart = async () => {
    console.log('voice mic pressed in');
    const locale = 'en-US';
    try {
      const voiceAvailable = await Voice.isAvailable();
      if (voiceAvailable) {
        await Voice.start(locale);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleVoiceEnd = async () => {
    console.log('voice mic pressed out');
    try {
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
  };
  Voice.onSpeechResults = e => {
    setInputText(e?.value?.[0]);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}>
        {chatHistory.map((message, index) => (
          <Text key={index} style={styles.message}>
            {message}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your query..."
          onSubmitEditing={handleSend}
        />
        <Pressable onPressIn={handleVoiceStart} onPressOut={handleVoiceEnd}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/05/26/20/42/mic-1418319_1280.png',
            }}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable onPress={handleSend}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2018/02/04/01/54/paper-planes-3128885_1280.png',
            }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatScreen;

/*
* chatbot
recipe name
success -message and list
failure- message
----
select recipe input
success- recipe message
try other recipe
*/
