
const express = require('express');
const adminRegisterRoute = require('./routes/adminRegistration');
const adminloginRoute = require('./routes/adminLogin');
const status = require('./routes/status');
const ticket = require('./routes/ticket');
const domain = require('./routes/domain');
const priority = require('./routes/priority');
const technicianLogin = require('./routes/technicianLogin');
const technicianRegisterRoute = require('./routes/technicianRegistration');
const technician = require('./routes/technician');
const connectDB = require('./config/connectDB');
const cors = require('cors');


const app = express();
app.use(cors());

connectDB();

//set a middleware to parse data
app.use(express.json());

app.use('/api/adminLogin',adminloginRoute);
app.use('/api/adminRegisterRoute',adminRegisterRoute);
app.use('/api/status',status);
app.use('/api/ticket',ticket);
app.use('/api/domain',domain);
app.use('/api/priority',priority);
app.use('/api/technicianLogin', technicianLogin);
app.use('/api/technicianRegisterRoute', technicianRegisterRoute);
app.use('/api/technician', technician);

const PORT = process.env.PORT || 5000;
	if(process.env.NODE_ENV==='production'){
		app.use(express.static('client/build'));

		app.get('*',(req,res)=>{
			res.sendFile(path.join(__dirname,'client','build','index.html'));
		})
	}
 app.listen(PORT);