import doctorModel from '../models/doctorModel.js';
import Doctor from '../models/doctorModel.js';

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await Doctor.findById(docId); 
    if (!docData) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    docData.available = !docData.available;
    await docData.save();

    res.json({
      success: true,
      message: `Availability changed `,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const doctorList= async(req,res)=>{
  try{
    const doctors= await doctorModel.find({}).select(['-password','-email'])
    res.json({
      success:true, 
      doctors

    })

  }catch(error){
    console.error(error);
    res.json({success:false, message:error.message})
  }
}

export { changeAvailablity, doctorList };