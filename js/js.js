var Name=document.getElementById("name");
var price=document.getElementById("price");
var model=document.getElementById("model");
var search=document.getElementById("search");
var description=document.getElementById("description");
var add_btn=document.getElementById('add_btn');
var update_btn=document.getElementById('update_btn');
var productArray=[];
var tableBody=document.getElementById("tableBody");
var k=0;

if( localStorage.getItem("myProducts")!=null)
{
    productArray =JSON.parse( localStorage.getItem("myProducts"));
     display(productArray);
}
else{
   productArray=[];
}
function add(){
    if (valid_name()&& valid_num()&& valid_model()==true){
    var product={
        name:Name.value,
        price:price.value,
        model:model.value,
        description:description.value
    }
productArray.push(product);
localStorage.setItem("myProducts",JSON.stringify(productArray));

// console.log(productArray)
clear();
display(productArray);
    }
    else{
        alert("invalid product must start with capital")
    }
}
function clear(){
  Name.value=" ";
  price.value=" ";
  model.value=" ";
  description.value=" ";
}
function display(item){
    var store=` `;
    for(var i=0;i<item.length;i++){
store+=`<tr>
<td> ${item[i].name}</td>
<td> ${item[i].price}</td>
<td> ${item[i].model}</td>
<td> ${item[i].description}</td>
<td>  <button onclick="deleteProduct(${i}) " type="button"  class="btn btn-outline-primary mx-auto d-block "> Delete</button> </td>
<td>  <button onclick="updateProduct(${i}) " type="button"  class="btn btn-outline-primary mx-auto d-block"> Update</button> </td>
</tr>
`;
    }
tableBody.innerHTML=store;
}
function search_pro(word){
var search_result=[];
for(var i=0;i<productArray.length;i++)
{
    if(productArray[i].name.toLowerCase().includes(word.toLowerCase())==true){
        search_result.push(productArray[i]);
    }
}

// console.log(search_result);
display(search_result);
}
// search_pro(search.value)
function deleteProduct(product){
    productArray.splice(product,1);
    localStorage.setItem("myProducts",JSON.stringify(productArray));
    display(productArray);
}
function updateProduct(product){
    k=product;
    Name.value=productArray[product].name
    price.value=productArray[product].price
    model.value=productArray[product].model
    description.value=productArray[product].description
    // deleteProduct(product)
add_btn.classList.add('d-none')
update_btn.classList.replace('d-none','d-inline-block')
}
function update(){
//   add();
    // productArray[1].name = Name.value;
    // productArray[1].price = price.value;
    // productArray[1].model = model.value;
    // productArray[1].description = description.value;
    var new_pro={
        name:Name.value,
        price:price.value,
        model:model.value,
        description:description.value
    }
productArray.splice(k,1,new_pro);
localStorage.setItem("myProducts",JSON.stringify(productArray));
clear();
display(productArray);

  add_btn.classList.replace('d-none','d-inline-block')
  update_btn.classList.replace('d-inline-block','d-none')
}
function valid_name(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    if(regex.test(Name.value)==true){
        Name.classList.replace("is-invalid","is-valid");
        return true;
        
    }
    else{
        Name.classList.add("is-invalid");
        return false;
    }
}
function valid_num(){
    var regex=/^[0-9]{3,8}/;
    if(regex.test(price.value)==true){
        price.classList.replace("is-invalid","is-valid");
        return true;
        
    }
    else{
        price.classList.add("is-invalid");
        return false;
    }
}
function valid_model(){
    var regex=/([A-Z]|[a-z]|[0-9]){3,8}$/;
    if(regex.test(model.value)==true){
        model.classList.replace("is-invalid","is-valid");
        return true;
        
    }
    else{
        model.classList.add("is-invalid");
        return false;
    }
}
// function update() {
//     var index = update_btn.getAttribute('data-index');
//     productArray[index].name = Name.value;
//     productArray[index].price = price.value;
//     productArray[index].model = model.value;
//     productArray[index].description = description.value;
//     localStorage.setItem("myProducts", JSON.stringify(productArray));
//     clear();
//     display(productArray);
//     add_btn.classList.remove('d-none');
//     update_btn.classList.add('d-none');
// }