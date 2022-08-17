

// render the cart page 
function showCart() {
    let rawData = localStorage.getItem('rawData');
    let dataList = JSON.parse(rawData);
    console.log(dataList);
    let indList = localStorage.getItem('indList');
    let itemList = JSON.parse(indList);
    let itemNum = localStorage.getItem('itemNum');
    var table = document.getElementById("myTable");
    let subTotalPrice = document.getElementById("subTotalValue");
    let subPrice = 0;
    for (let i = 0; i < itemList.length; i++) {
        let itemIndex = itemList[i].id;
        console.log('itemIndex', itemIndex);
        var row = table.insertRow(i + 1);
        row.id = itemIndex;
        row.className = 'itemRows';
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = ("<img class='itemImg' src='" + dataList[itemIndex].url + "'alt=''/>");
        cell1.style = "width:20%";
        cell2.innerHTML = ("<p style='margin-top:10px'>" + dataList[itemIndex].name + "</p> <div class ='control'> \
                    <div class='quantityControl'> <span class='addBnt' onclick='addNum("+ itemIndex + ")'>^</span> <input class='quanInput' type='text' size='4' value=" + itemList[i].quantity + "> <span class ='subBnt' id='" + itemIndex + "' onclick='subNum(" + itemIndex + ")'>v</span> </div>\
                    <button class='deletBnt' onclick='deletNum("+ itemIndex + ")'>Delete</button> </div>");
        cell2.style = "width:40%;padding-left:5%;font-size:16px;"
        let price = dataList[itemIndex].price * itemList[i].quantity;
        console.log(price);
        cell3.innerHTML = ("<span>" + price + "</span>")
        cell3.className = "price";
        console.log(cell3.className);
        cell3.style = "text-align: center; font-size:18px";
        subPrice += price;
    }
    let cartdisp = document.getElementById("cartNum");
    let cartdisp1 = document.getElementById("cartNum1");
    cartdisp1.innerHTML = itemNum;
    cartdisp.innerHTML = itemNum;
    subTotalPrice.innerHTML = `Subtotal(${itemNum} item): $${subPrice.toFixed(2)}`;
    localStorage.setItem("subTotal", subPrice);



}

// increase item quantity function
function addNum(j) {
    console.log('j', j);
    let indList = localStorage.getItem('indList');
    let itemList = JSON.parse(indList);

    console.log(itemList[0].id);
    let itemRows = (document.getElementsByClassName('itemRows'));

    let targetRow;
    for (let f = 0; f < itemRows.length; f++) {
        console.log(f);
        if (itemRows[f].id == j) {
            targetRow = f;
            break;
        }
    }
    console.log(itemRows);
    console.log(targetRow);
    let perPrice = parseFloat(document.getElementsByClassName("price")[targetRow].textContent / document.getElementsByClassName("quanInput")[targetRow].value);
    let itemNum = localStorage.getItem('itemNum');
    document.getElementsByClassName("price")[targetRow].textContent = (parseFloat(document.getElementsByClassName("price")[targetRow].textContent) + perPrice).toFixed(2);
    document.getElementsByClassName("quanInput")[targetRow].value = parseFloat(document.getElementsByClassName("quanInput")[targetRow].value) + 1;
    let targetInd = itemList.findIndex((e) =>
        e.id == j
    )
    console.log(targetInd);
    itemList[targetInd].quantity++;
    itemNum++;
    localStorage.setItem('indList', JSON.stringify(itemList));
    localStorage.setItem("itemNum", itemNum);
    let cartdisp = document.getElementById("cartNum");
    let cartdisp1 = document.getElementById("cartNum1");
    cartdisp1.innerHTML = itemNum;
    cartdisp.innerHTML = itemNum;

    calPrice()
}

// decrease item quantity function
function subNum(j) {
    let indList = localStorage.getItem('indList');
    let itemList = JSON.parse(indList);
    let itemNum = localStorage.getItem('itemNum');
    console.log(itemNum);
    let itemRows = (document.getElementsByClassName('itemRows'));

    let targetRow;
    for (let f = 0; f < itemRows.length; f++) {
        console.log(f);
        if (itemRows[f].id == j) {
            targetRow = f;
            break;
        }
    }
    let perPrice = parseFloat(document.getElementsByClassName("price")[targetRow].textContent / document.getElementsByClassName("quanInput")[targetRow].value);
    let targetInd = itemList.findIndex((e) =>
        e.id === j
    )
    let newquantity = parseInt(itemList[targetInd].quantity) - 1;
    console.log(newquantity);
    if (!newquantity) {
        console.log('targetInd', targetInd);
        itemList.splice(targetInd, 1);
        document.getElementById("myTable").deleteRow(targetRow + 1);

    } else {
        document.getElementsByClassName("price")[targetRow].textContent = (parseFloat(document.getElementsByClassName("price")[targetRow].textContent) - perPrice).toFixed(2);
        document.getElementsByClassName("quanInput")[targetRow].value = parseFloat(document.getElementsByClassName("quanInput")[targetRow].value) - 1;
        itemList[targetInd].quantity--;
    }

    itemNum--;
    console.log(itemNum);

    localStorage.setItem('indList', JSON.stringify(itemList));
    localStorage.setItem("itemNum", itemNum);
    let cartdisp = document.getElementById("cartNum");
    let cartdisp1 = document.getElementById("cartNum1");
    cartdisp1.innerHTML = itemNum;
    cartdisp.innerHTML = itemNum;
    calPrice()
}

// delete item quantity function
function deletNum(j) {
    let indList = localStorage.getItem('indList');
    let itemList = JSON.parse(indList);
    let itemNum = localStorage.getItem('itemNum');
   
    let itemRows = (document.getElementsByClassName('itemRows'));
    let targetRow;
    for (let f = 0; f < itemRows.length; f++) {
        console.log(f);
        if (itemRows[f].id == j) {
            targetRow = f;
            break;
        }
    }
   
    let targetInd = itemList.findIndex((e) =>
        e.id == j
    )
    itemList.splice(targetInd, 1);
    itemNum = itemNum - parseInt(document.getElementsByClassName("quanInput")[targetRow].value);
    document.getElementById("myTable").deleteRow(targetRow + 1);
    
    localStorage.setItem('indList', JSON.stringify(itemList));
    localStorage.setItem("itemNum", itemNum);
    let cartdisp = document.getElementById("cartNum");
    let cartdisp1 = document.getElementById("cartNum1");
    cartdisp1.innerHTML = itemNum;
    cartdisp.innerHTML = itemNum;
    calPrice()
}   

// calculate and show subTotalPrice function
function calPrice() {
    let priceList = document.getElementsByClassName('price');
    let itemNum = localStorage.getItem('itemNum');
    let subPrice = 0;
    for (let e = 0; e < priceList.length; e++) {
        subPrice += parseFloat(priceList[e].textContent);
        console.log(e);
    }
    let subTotalPrice = document.getElementById("subTotalValue");
    subTotalPrice.innerHTML = `Subtotal(${itemNum} item): $${subPrice.toFixed(2)}`;
}
