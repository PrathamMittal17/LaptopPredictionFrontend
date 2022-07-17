import './App.css';
import {Container,Select,MenuItem,Slider,FormGroup,Checkbox,FormControlLabel,Button} from '@mui/material';
import {useEffect, useState} from 'react'
function App() {
  const brands = ['Apple', 'HP', 'Acer', 'Asus', 'Dell', 'Lenovo', 'Chuwi', 'MSI',
  'Microsoft', 'Toshiba', 'Huawei', 'Xiaomi', 'Vero', 'Razer',
  'Mediacom', 'Samsung', 'Google', 'Fujitsu', 'LG']

  const types = ['UltraBook', 'Notebook', 'Netbook', 'Gaming', '2 in 1 Convertible',
  'Workstation']

  const Ram = [ 2,  4,  6,  8, 12, 16, 24, 32, 64]
  const width = [1366, 1440, 1600, 1920, 2160, 2256, 2304, 2400, 2560, 2736, 2880,3200, 3840]
  const height = [ 768,  900, 1080, 1200, 1440, 1504, 1600, 1800, 1824, 2160]
  const SSD = [0,16,32,64,128,180,240,256,512,768,1024]
  const HDD = [   0,   32,  128,  500, 1024, 2048]
  const flash = [  0,  16,  32,  64, 128, 256, 512]
  const hybrid = [   0,  508, 1024]
  const os = ['Windows','Mac', 'No os', 'Other']
  const CPUbrand = ['AMD','Intel']
  const GPUbrand = ['AMD','Intel','Nvidia']
  
  const[brand, setBrand] = useState(brands[0])
  const[type, setType] = useState(types[0])
  const[ram, setRam] = useState(Ram[0])
  const[Weight,setWeight] = useState(0.03)
  const[IPS,setIPS] = useState(false)
  const[touch,setTouch] = useState(false)
  const[screenSize,setScreenSize] = useState(5)
  const[Width,setWidth] = useState(width[0])
  const[Height,setHeight] = useState(height[0])
  const[SSDStorage,setSSD] = useState(SSD[0])
  const[HDDStorage,setHDD] = useState(HDD[0])
  const[FlashStorage,setFlashStorage] = useState(flash[0])
  const[HybridStorage,setHybridStorage] = useState(hybrid[0])
  const[OS,setOS] = useState(os[0])
  const[cpuBrand,setCpuBrand] =   useState(CPUbrand[0])
  const[cpuSpeed,setCpuSpeed] =   useState(0.1)
  const[gpu,setGPU] = useState(GPUbrand[0])
  const[Predict,setPredict] = useState(false)
  const[Price,setPrice] = useState(null)
  useEffect(()=>{
    fetch("https://hidden-journey-72189.herokuapp.com/")
  },[])

  const getPrediction = () => {
    setPredict(true)

    fetch("https://hidden-journey-72189.herokuapp.com/predict",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        "Company": brand,
        "TypeName": type,
        "Inches": screenSize,
        "Ram": ram,
        "Weight": Weight,
        "Width": Width,
        "Height": Height,
        "IPS": IPS ? 1 : 0,
        "TouchScreen": touch ? 1 : 0,
        "SSD": SSDStorage,
        "HDD": HDDStorage,
        "FlashStorage": FlashStorage,
        "Hybrid": HybridStorage,
        "CpuSpeed": cpuSpeed,
        "CpuCompany": cpuBrand,
        "GPU_Company": gpu,
        "OS": OS
      })
  })
  .then(res => res.json())
  .then(data=>setPrice(data.result))
  }
  return (
    <div className="App">
      <Container>
        <h1>Laptop Price Predictor</h1>
        <div style={{textAlign:'left'}}>

          <h2>Brand</h2>
          <Select
            style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
            defaultValue={0}
            fullWidth
            onChange={(e)=>setBrand(brands[e.target.value])}
          >
            {
              brands.map((brand,index)=>{
              return <MenuItem key={index} value={index}>{brand}</MenuItem>
              })
            }
          </Select>

          <h2>Type</h2>
          <Select
            style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
            defaultValue={0}
            fullWidth
            onChange={(e)=>setType(e.target.value)}
          >
            {
              types.map((type,index)=>{
              return <MenuItem key={index} value={index}>{type}</MenuItem>
              })
            }
          </Select>

          <h2>Ram (in GB)</h2>
          <Select
            style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
            defaultValue={0}
            fullWidth
            onChange={(e)=>setRam(Ram[e.target.value])}
          >
            {
              Ram.map((r,index)=>{
              return <MenuItem key={index} value={index}>{r}</MenuItem>
              })
            }
          </Select>

          <h2>Weight (in kgs)</h2>
          <Slider 
            defaultValue={0.03}
            step={0.01}
            min={0.03}
            max={10.00}
            valueLabelDisplay="auto"
            onChange={e=> setWeight(e.target.value)}
          />
          <h2>Display</h2>
            <FormGroup style={{flexDirection:'row',justifyContent:'center',gap:'10px'}}>
              <FormControlLabel control={<Checkbox  size="large" style={{color:'white'}} onChange={(e)=>setIPS(e.target.checked)}/>} label="IPS" />
              <FormControlLabel control={<Checkbox  size="large" style={{color:'white'}} onChange={(e)=>setTouch(e.target.checked)}/>} label="TouchScreen" />
            </FormGroup>

            <h3 style={{textAlign:'center'}}>Screen Size (in inches)</h3>
            <Slider 
              defaultValue={5.0}
              step={0.1}
              min={5.0}
              max={25.0}
              valueLabelDisplay="auto"
              onChange={e=> setScreenSize(e.target.value)}
            />

            <h3 style={{textAlign:'center'}}>Screen Resolution</h3>
              <p style={{textAlign:'center'}}>Width</p>
                <Select
                style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
                defaultValue={0}
                fullWidth
                onChange={(e)=>setWidth(width[e.target.value])}
              >
                {
                  width.map((w,index)=>{
                  return <MenuItem key={index} value={index}>{w}</MenuItem>
                  })
                }
              </Select>

              <p style={{textAlign:'center'}}>Height</p>
              <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setHeight(height[e.target.value])}
            >
              {
                height.map((h,index)=>{
                return <MenuItem key={index} value={index}>{h}</MenuItem>
                })
              }
            </Select>


        <h2>CPU</h2>
            <h3 style={{textAlign:'center'}}>Cpu Brand</h3>
              <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setCpuBrand(CPUbrand[e.target.value])}
              >
              {
                CPUbrand.map((h,index)=>{
                return <MenuItem key={index} value={index}>{h}</MenuItem>
                })
              }
              </Select>

            <h3 style={{textAlign:'center'}}>Cpu Speed</h3>
            <Slider 
              defaultValue={0.1}
              step={0.1}
              min={0.1}
              max={7.0}
              valueLabelDisplay="auto"
              onChange={(e)=>setCpuSpeed(e.target.value)}
            />

        <h2>Gpu Brand</h2>
            <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setGPU(GPUbrand[e.target.value])}
              >
              {
                GPUbrand.map((h,index)=>{
                return <MenuItem key={index} value={index}>{h}</MenuItem>
                })
              }
            </Select>
        
        <h2>Storage</h2>
          <h3 style={{textAlign:'center'}}>SSD (in GB)</h3>
            <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setSSD(SSD[e.target.value])}
              >
              {
                  SSD.map((s,index)=>{
                  return <MenuItem key={index} value={index}>{s}</MenuItem>
                  })
                }
            </Select>

          <h3 style={{textAlign:'center'}}>HDD (in GB)</h3>
            <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setHDD(HDD[e.target.value])}
              >
              {
                  HDD.map((h,index)=>{
                  return <MenuItem key={index} value={index}>{h}</MenuItem>
                  })
                }
            </Select>
          
          <h3 style={{textAlign:'center'}}>Flash Storage (in GB)</h3>
            <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setFlashStorage(flash[e.target.value])}
              >
              {
                  flash.map((f,index)=>{
                  return <MenuItem key={index} value={index}>{f}</MenuItem>
                  })
                }
            </Select>

            <h3 style={{textAlign:'center'}}>Hybrid Storage (in GB)</h3>
            <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setHybridStorage(hybrid[e.target.value])}
              >
              {
                  hybrid.map((h,index)=>{
                  return <MenuItem key={index} value={index}>{h}</MenuItem>
                  })
                }
            </Select>

          <h2>OS</h2>
            <Select
              style={{backgroundColor:'#31333F',color:'white',textAlign:'left'}}
              defaultValue={0}
              fullWidth
              onChange={(e)=>setOS(os[e.target.value])}
              >
              {
                  os.map((o,index)=>{
                  return <MenuItem key={index} value={index}>{o}</MenuItem>
                  })
                }
            </Select>

        
          <Button onClick={getPrediction}variant="outlined" size="large" style={{marginTop:"20px",marginBottom:"20px",marginLeft:'auto',marginRight:'auto',display:'block',color:'white'}}>Predict Price</Button>
          {Predict 
          ? Price ? <h1 style={{textAlign:'center',marginTop:'20px',marginBottom:'100px'}}>Predicted Price is : {Price.toFixed(2)} </h1> : <h1 style={{textAlign:'center',marginTop:'20px',marginBottom:'100px'}}>Predicting Price...</h1>
          : 
          <div style={{margin:'100px'}}></div>
          }
      </div>
     </Container>
    </div>
  );
}

export default App;
