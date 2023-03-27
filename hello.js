const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//node js 
//basic configaration files
// Sure, here's a simple "Hello, World!" program in Node.js:

console.log("Hello, World!");
console.log("Hello, Bangladesh!");
console.log("Hello, Bangladesh!");
console.log("Hello, Bangladesh!");
console.log("Hello, Bangladesh!");

//############################

exports.addCustomerInfo = catchAsyncErrors(async (req, res, next) => {

  const {
    employmentStatus,
    nationality,
    age,
    monthlyIncome,
    loanFromOtherBank,
    monthlyInstallment,

  } = req.body;


  try {
    const eligibility = await Eligibility.create({
      employmentStatus,
      nationality,
      age,
      monthlyIncome,
      loanFromOtherBank,
      monthlyInstallment,
    });

    res.status(200).json({
      createDate: new Date().toUTCString(),
      success: true,
      status: 200,
      //customerInfo,
      message: _response.success,
      data: { eligibility }
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: _response.internalError,
    });

  }

});