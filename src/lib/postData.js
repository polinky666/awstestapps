export async function feedInquiry(feedItem){
    // ここに処理を書く
    await new Promise(resolve => setTimeout(resolve, 2000));

    let answer = feedItem.replace(/\n/g, '<br>');
    return '[answer]<br>' + answer;
}