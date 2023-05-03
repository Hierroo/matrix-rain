//const canvas = document.querySelector(".canvas")

// 30x20
//15x20 - 360px 800px
//CONSERTAR BUG DO INDEX DA LINHA 0 COLUNA 0

const fragment = document.createDocumentFragment()
const pixelsArray = []
const largura = 30
const altura = 30
let debug = false


const btn = document.querySelector(".btn")
//btn.addEventListener("click", changeDebug)

const colors = [ "000000", "004010", "008020", "00c030", "00e038", "00f03c", "00f03c", "00f03c", "00f83e", "00fc3f", "00fe40", "00fe40", "00fe40", "00fe40", "ffffff" ]

const chars = [
    'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'ゐ', 'ゑ', 'を', 'ん', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ア', 'イ', 'ウ', 'エ', 'オ','カ', 'キ', 'ク', 'ケ', 'コ','サ', 'シ', 'ス', 'セ', 'ソ','タ', 'チ', 'ツ', 'テ', 'ト','ナ', 'ニ', 'ヌ', 'ネ', 'ノ','ハ', 'ヒ', 'フ', 'ヘ', 'ホ','マ', 'ミ', 'ム', 'メ', 'モ','ヤ', 'ユ', 'ヨ','ラ', 'リ', 'ル', 'レ', 'ロ','ワ', 'ヰ', 'ヱ', 'ヲ','ン','ガ', 'ギ', 'グ', 'ゲ', 'ゴ','ザ', 'ジ', 'ズ', 'ゼ', 'ゾ','ダ', 'ヂ', 'ヅ', 'デ', 'ド','バ', 'ビ', 'ブ', 'ベ', 'ボ','パ', 'ピ', 'プ', 'ペ', 'ポ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', '0', '1', '2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8', '9']



const randomGlyphs = []

const timer = (seconds) => {
    let time = seconds * 1000
    
    return new Promise(res => setTimeout(res, time))
}


function start() {

    CreateData()
    CreateRainSource()
    CreateGlyphsData()
    setInterval(CreateGlyphsData, 2000)
    RenderDataStructure()
    rainEffect()
    setInterval(rainEffect, 100)
      
}






function CreateData() {
    
    const numPixels = largura * altura
    for (let i = 0; i < numPixels; i++) {
        pixelsArray[ i ] = 0
    }

}

function CreateGlyphsData() {
    for (let row = 0; row < altura; row++) {

        for (let col = 0; col < largura; col++) {

            const randomGlyph = chars[ Math.floor(Math.random() * chars.length) ]
            const index = col + (row * largura)

            randomGlyphs[ index ] = randomGlyph

        }
    }

    RenderDataStructure()


}

function RenderDataStructure() {
    
    const tableBody = document.createElement("tbody")
    tableBody.setAttribute("class", "canvas-body")
    
    // let html = "<table class='canvas'>"
    
    for (let row = 0; row < altura; row++) {
        
        const tableRow = document.createElement("tr")
        tableRow.setAttribute("class", "row")
        
        
        // html += `<tr class='row'>`
        
        for (let col = 0; col < largura; col++){
            
            const tableData = document.createElement("td")
            tableData.setAttribute("class", "column")
            
            const dataIndex = col + ( row * largura)
            const rainIntensity = pixelsArray[dataIndex]
            const glyph = randomGlyphs[dataIndex]
            
            
            if(debug === true){
                
                const index = document.createElement("span")
                const data = document.createElement("span")
                data.setAttribute("class", "data")
                index.setAttribute("class", "index")
                
                index.innerText = dataIndex
                data.innerText = rainIntensity
                
                // html += `
                //     <td class='column'>
                //         <span class="index">${dataIndex}</span>
                //         <span class='data'>${rainIntensity}</span>
                //     </td>`
                    
                tableData.append(index)
                tableData.append(data)
                
                
            } else {
                
                const color = colors[ rainIntensity ]
                const glypho = document.createElement("span")
                glypho.setAttribute("class", "glyph")
                glypho.style = `opacity: ${rainIntensity / 2}; color: #${color};`
                glypho.innerText = glyph
                
                
                // html += `
                //     <td class='column';'>
                //         <span class='glyph' style='opacity: ${rainIntensity / 2}; color: #${color};'>${glyph}</splan>
                //     </td>`
                // html += ""
                
                tableData.appendChild(glypho)
            }
            
            tableRow.append(tableData)
        }
        
        tableBody.append(tableRow)
        
        // html += "</tr>"
    }
    
    // html += "</table>"
    
    //document.querySelector(".canvas").innerHTML = html
    
    fragment.replaceChildren(tableBody)
    document.querySelector(".canvas").replaceChildren(fragment)
}


function CreateRainSource() {
    
    for (let column = 0; column < largura; column++) {
        pixelsArray[column] = 0
    }
}

async function rainEffect() {

    const column = Math.floor(Math.random() * (largura +1))

    for (let row = 0; row < (altura + 15); row++){
        
        //for (let col = 0; col < altura; col++)
        //const column = Math.floor(Math.random() * altura)
        //for (let col = column; col < column + 1; col++)

        for (let col = column; col < column + 1; col++) {
            const index = col + (largura * row)
            updateData(index)
        }
        //const randomVel = Math.floor(Math.random() * (0.06 + 0.00006) - 0.00006)
        
        RenderDataStructure()
        fade()
        await timer(0.1)
        
    }
    
}

function updateData(index){
   
    const cima = index - largura
    const baixo = index + largura
    
    pixelsArray[ baixo ] = 0
    
    pixelsArray[index] = 14
    
    
    // for (let i = 0; i <= 3; i++) {
    //     const baixo = index + (largura * i)
    //     pixelsArray[baixo] = i
    // }
    
    fade(index)
    
    
    
}

function fade(index) {
    
    const cima = index - largura
    const baixo = index + largura
    const current = pixelsArray[ index ]
    const column = Math.floor(Math.random() * 10)
    
    // if(cima >= 0){
    //     pixelsArray[index] = current
    //     return
    // }
    
    // pixelsArray[cima] = current - 1
    //pixelsArray[ baixo ] = 0
    
    for (let i = 1; i <= 15; i++){
        const cima = index - (largura * i)
        const value = current - i
        
        // if (pixelsArray[ cima ] < 0) {
        //     break
        // }
        
        if (pixelsArray[ cima ] === 0){
           break
        }
        
        pixelsArray[ cima ] = value
        
        
        
        // if(pixelsArray[cima] <= 0){
        //     return
        // } else {
        //     pixelsArray[ cima ] = value
        // }
        
    }
    
    
    

}

function changeDebug() {
    console.log(debug)
    switch(debug) {
        case false:
            debug = true
            break
        case true:
            debug = false
            break
        default:
            break
    }
}


start()



