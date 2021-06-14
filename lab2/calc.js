function solve(a, b, c) {
  var a = $("#a").val(),
    b = $("#b").val(),
    c = $("#c").val();

  var D = b * b - 4 * a * c;

  if (a == 0) alert("Введен неправильный коэффициент");
  if (D < 0) {
    console.log(":(");
    $("#x1").html("");
    $("#x2").html("Корней нет!");
  } else {
    console.log("x1 = " + (-b - Math.sqrt(D)) / (2 * a));
    console.log("x2 = " + (b - Math.sqrt(D)) / (2 * a));
    $("#x1").html("x1 = " + (-b - Math.sqrt(D)) / (2 * a));
    $("#x2").html("x2 = " + (b - Math.sqrt(D)) / (2 * a));
  }
}
