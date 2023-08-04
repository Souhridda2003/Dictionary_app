const form=document.querySelector('form');
const resultDiv=document.querySelector('.result');



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getwordinfo(form.elements[0].value);
});
const getwordinfo=async (word)=>{
    // alert("Word"+word);
    try {
        resultDiv.innerHTML="Fetching Data......."
    const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data=await response.json();
    let definitions=data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
    <h2><strong>Word:</strong>${data[0].word}</h2>
    <p><strong>Meaning:</strong>${definitions.definition === undefined ?"not found":definitions.definition}</p>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Example:</strong>${definitions.example === undefined?"Not Found":definitions.example}</p>
    <p><strong>Antonyms:</strong></p>
    `;

    //fetch antonyms
    if(definitions.antonyms.length===0){
        resultDiv.innerHTML+= `<span>Not found</span>`
    }
    else{
    for(let i=0;i<definitions.antonyms.length;i++){
        resultDiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`
        }
    }
    //adding read more button
    resultDiv.innerHTML+= `<div><a href="${data[0].sourceUrls}"target="_blank"=>Read More</a></div>`
    console.log(data);
    } catch (error) {
        resultDiv.innerHTML=`<p>Sorry,the word in not found</p>`
    }
}
//Task To Do-Fetch Synonyms as we have fone for antonyms
