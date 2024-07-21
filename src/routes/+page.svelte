<script>
    import { afterUpdate } from "svelte";
    import { feedInquiry } from "$lib/postData";
    let sideBarClose = false;
    let items = [{sender:'bot', content:'ようこそ'}];
    // [...Array(100)].map((_, i)=> {
    //     let s = i%2 ? 'bot':'inquisitor';
    //     return {sender:s, content:`ItemItemItemItemItem${i}`}
    // })
    let btnDisabled = false;
    let feedText = '';
    async function feed(){
        btnDisabled = !btnDisabled;
        let feedCopy = feedText;
        feedText = '';
        let formattedText = feedCopy.replace(/\n/g, '<br>');
        items = [...items,{sender:'inquisitor', content:formattedText}];
        let ans = await feedInquiry(feedCopy);
        items = [...items,{sender:'bot', content:ans}];
        btnDisabled = !btnDisabled;
    }
    async function keyAction(e){
        if (e.ctrlKey && e.key === 'Enter') {
        await feed();
      }
    }

    afterUpdate(() => {
        let elem = document.querySelector('.feed');
        elem.scrollTop = elem.scrollHeight;
    });



</script>

<header>
    <h1>App Title</h1>
    <button on:click={()=> sideBarClose = !sideBarClose}>{sideBarClose ? '←' : '→'}</button>
</header>
<main>
    <div class="chat" class:sideBarClose>
        <div class="feed">
            {#each items as i}
                <div class={i.sender}>
                    <div class="baloon">
                        <p>{@html i.content}</p>
                    </div>
                </div>
            {/each}
        </div>
        <div class="input">
                <textarea name="feed" placeholder="質問を入力してください" required bind:value={feedText} on:keydown={keyAction} disabled={btnDisabled}></textarea>
                <button on:click={feed} disabled={btnDisabled}>送信</button>

        </div>
    </div>

    <div class="side" class:sideBarClose>side</div>
</main>


<style>
    header {
        background-color: #a0a7c6;
        height: 5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
    }
    header h1{
        font-size: 2em;
        font-weight: bold;
    }

    header button{
        height: 2em;
        width: 2em;
        background-color: #eee;
        border: 1px solid #ddd;
        border-radius: 10%;
    }


    main{
        display: flex;
    }
    .chat{
        width: calc(100dvw - 15em);
        
    }
    .sideBarClose.chat{
        width: calc(100dvw);

    }

    .feed {
        background-color: #eee;
        height: calc(100dvh - 15em);
        overflow: scroll;
        scroll-behavior: smooth;
    }


    .feed div{
        margin: 0.1em;
        padding: 0.7em;
        display:flex;
        flex-wrap: wrap;
        
    }

    .bot{
        flex-direction: row;
    }
    .inquisitor{
        flex-direction: row-reverse;
        
    }
    .baloon{
        background-color: white;
        max-width: 80%;
        min-width: 51%;
        display: inline-block;
        border-radius: 0.2em;
    }

    .baloon p{
        word-break: break-all;
    }
    
    .input{
        background-color: #c7cff3;
        height: 10em;
        position: relative;
    }
    .input textarea{
        height: 7em;
        width: calc(100% - 3em);
        margin: 1em;
        resize: none;
        border: 1px solid white;
        border-radius: 0.5em;
        padding: 0.5em;
    }
    .input button{
        padding: 0.2em;
        width: 4em;
        background-color: #999;
        border: 1px solid #999;
        border-radius: 0.5em;
        position: absolute;
        bottom: 1.6em;
        right: 1.8em;
    }
    .input textarea:focus{
        border-color: #999;
        outline: none;
    }

    .side {
        background-color: #bbb;
        width: 15em;
    }
    .sideBarClose.side{
        display: none; 
    }
</style>

