
async function getdata() {
    try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching quote:", error);
        return null;
    }
}


const newquotebtn = document.getElementById("newquote");
const quotedisplay = document.querySelector(".quote");
const authorDisplay = document.querySelector(".author");
let quoteddata;

getdata().then((res)=>{
    quotedisplay.textContent = `"${res.data.content}"`;
    authorDisplay.textContent = `- ${res.data.author}`;
    quoteddata=res.data.content;
})


newquotebtn.addEventListener("click", async () => {
    const res = await getdata();
    if (res && res.data) {
        
        quotedisplay.textContent = `"${res.data.content}"`;
        authorDisplay.textContent = `- ${res.data.author}`;
        quoteddata=res.data.content;

    } else {
        quotedisplay.textContent = "Failed to load quote. Try again!";
        authorDisplay.textContent = "";
    }
});
function copytoclip() {

    var copyText = document.querySelector(".quote").textContent;
    var tempInput = document.createElement("textarea");
    tempInput.value = copyText;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(tempInput.value);
    document.body.removeChild(tempInput);

    alert("Copied the text: " + copyText);

}


const twitterApit=`https://twitter.com/intent/tweet?text=${quoteddata}`;
const pageurl=location.href;
console.log(pageurl);
const exportbtn=document.querySelector(".export");
exportbtn.addEventListener("click",()=>{
    if (quoteddata) {
        const twitterApi = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteddata)}`;
        window.open(twitterApi, "_blank");
        console.log(twitterApi);
    } else {
        alert("No quote to share. Generate a quote first!");
    }
})
