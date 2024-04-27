import { Box, Button, FormControl, FormControlLabel, FormLabel, Input, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loader from '../../components/Loader/Loader';
import EditIcon from '@mui/icons-material/Edit';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateGrade } from '../../utils/usefulFunctions';
import { usePDF } from 'react-to-pdf';
import Cookies from 'js-cookie'
const MySubject = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id, subject, grade } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: `${new Date().toUTCString().toString()}-mySubject.pdf` });
  const navigate = useNavigate();
  const [term, setTerm] = useState(1);
  const [selectedActivity, setSelectedAct] = useState({})
  const [subjectMarks, setSubMarks] = useState([]);
  const [data, setData] = useState([])
  const [max, setMax] = useState(100);
  const [min, setMin] = useState(0)
  const [activity, setActivity] = useState({
    title: '',
    desc: '',
    link: '',
    actType: 'activity'
  })
  const handleClose = () => {
    setOpen(false)
    setUpdateOpen(false)
  }

  //HANDLE THE Activity CREATION FIELDS
  const handleCreateChange = (field, value) => {
    setActivity((prevData) => ({ ...prevData, [field]: value }));
  };

  //HANDLE THE Activity CREATION FIELDS
  const handleUpdateChange = (field, value) => {
    setSelectedAct((prevData) => ({ ...prevData, [field]: value }));
  };

  const getAllActivity = async () => {
    try {
      const data = await authAxios.get(`${apiUrl}/activity/${id}`)
      setAssignments(data.data);
      setIsLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteAct = async (id) => {
    console.log(id);
    try {
      const deleted = await authAxios.delete(`${apiUrl}/activity/${id}`);
      if (deleted.data) {
        toast.success('Activity Deleted Success!');
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleActCreate = async () => {
    try {
      if (!activity.title || !activity.desc) {
        throw Error('Title and Description is Required')
      }
      const submitedAct = await authAxios.post(`${apiUrl}/activity/${id}`, activity);
      if (submitedAct.data) {
        toast.success('Activity Updating Success!');
        setRefresh((prev) => !prev);
      }

    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    }
  }
  const handleActUpdate = async () => {
    try {
      if (!selectedActivity.title || !selectedActivity.desc) {
        throw Error('Title and Description is Required')
      }
      const submitedAct = await authAxios.put(`${apiUrl}/activity/${selectedActivity._id}`, selectedActivity);
      if (submitedAct.data) {
        toast.success('Activity Created Success!');
        setRefresh((prev) => !prev);
      }

    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
    }
  }
  function processDataForChart(data) {
    // Define mark ranges and initialize count object
    const markRanges = ["0-35", "36-45", "46-65", "66-75", "76-100"];
    const countObj = {};
    if (data) {
      markRanges.forEach(range => {
        countObj[range] = 0;
      });

      // Count the number of students in each mark range
      data?.forEach(entry => {
        const mark = entry.mark;
        if (mark >= 0 && mark <= 35) {
          countObj["0-35"]++;
        } else if (mark >= 36 && mark <= 45) {
          countObj["36-45"]++;
        } else if (mark >= 46 && mark <= 65) {
          countObj["46-65"]++;
        } else if (mark >= 66 && mark <= 75) {
          countObj["66-75"]++;
        } else if (mark >= 76 && mark <= 100) {
          countObj["76-100"]++;
        }
      });

      // Convert count object to array of objects
      const chartData = Object.keys(countObj).map(range => {
        return { range: range, marks: countObj[range] };
      });

      return chartData;
    } else {
      return null
    }
  }


  const getSubjectMarks = async () => {
    try {
      const resp = await authAxios.get(`${apiUrl}/subject/marks/${id}/${term}`)
      console.log(resp.data);
      setSubMarks(resp.data)
      const da = processDataForChart(resp?.data[0]?.marks)
      setData(da)
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowUpdate = (row) => {
    setSelectedAct(row);
    setUpdateOpen(true);
  }

  useEffect(() => {
    getSubjectMarks()
  }, [term])
  useEffect(() => {
    getAllActivity();
  }, [refresh])

  // Separate assignments based on type
  const assignmentType = assignments.reduce(
    (acc, assignment) => {
      if (assignment.actType === 'activity') {
        acc.assignments.push(assignment);
      } else if (assignment.actType === 'learning') {
        acc.materials.push(assignment);
      }
      return acc;
    },
    { assignments: [], materials: [] }
  );

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div className='bg-white p-3 rounded-lg shadow-md'>
      <Typography variant='h5' textAlign={'center'}>{subject + ' - ' + grade}</Typography>
      <Button variant='contained' color='warning' onClick={() => setOpen(true)}>Create New Activity</Button>
      <Button variant='contained' color='secondary' sx={{ float: 'right' }} onClick={() => navigate(`../subjmarks/${id}/${subject}/${grade}`)}>Publish Marks</Button>
      {
        !isLoading ? <>
          <div>
            <Typography variant='h6'>Current Assignments</Typography>
            <br />
            {
              assignmentType.assignments.map((act, key) => (
                <div className='bg-amber-500 text-white rounded-lg p-3 mb-3 relative' key={key}>
                  <h4>{act.title}</h4>
                  <p className='text-xs'>{act.desc}</p>
                  <p className='text-right text-xs text-gray-300'>{act.createdAt}</p>

                  <div className='absolute top-0 right-0 cursor-pointer'>
                    <EditIcon fontSize='medium' color='warning' onClick={() => handleShowUpdate(act)} />
                    <DeleteForeverIcon fontSize='medium' color='error' onClick={() => deleteAct(act._id)} />

                  </div>
                </div>
              ))
            }
          </div>
          <br />
          <div>
            <Typography variant='h6'>Given Learning Materials</Typography>
            <br />
            {
              assignmentType.materials.map((lmt, key) => (
                <div className='bg-green-300 text-black rounded-lg p-3 mb-3 relative' key={key}>
                  <h4>{lmt.title}</h4>
                  <p className='text-xs'>{lmt.desc}</p>
                  <a href={lmt.link} target='_blank' className='text-xs text-blue-500'>{lmt.link}</a>
                  <p className='text-right text-xs text-gray-900'>{lmt.createdAt}</p>
                  <div className='absolute top-0 right-0 cursor-pointer' >
                    <EditIcon fontSize='medium' color='warning' onClick={() => handleShowUpdate(lmt)} />
                    <DeleteForeverIcon fontSize='medium' color='error' onClick={() => deleteAct(lmt._id)} />
                  </div>
                </div>
              ))
            }

            <h1 className='text-xl my-5'>Your Subject Marks Distribution</h1>
            Term
            <select name="" id="" className='px-4 py-2 border' value={term} onChange={(e) => setTerm(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <Button type='button' variant='contained' onClick={() => toPDF()} className='mt-10 float-right'>Download PDF</Button>
            <div ref={targetRef}>
              <div className='space-y-3 my-5'>
                <h1>Teacher : {Cookies.get('firstName')}</h1>
                <h2>Subject : {subject} </h2>
                <h5>Date : {new Date().toDateString()}</h5>
              </div>
              <div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="marks" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              MIN
              <Input value={min} onChange={(e) => setMin(e.target.value)}  placeholder='Min' className='px-2'/>
              Max
              <Input value={max} onChange={(e) => setMax(e.target.value)} placeholder='Max' className='px-2'/>
              <table className='w-full'>
                <tr>
                  <th className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>Student Id</th>
                  <th className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>Student Name</th>
                  <th className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>Mark</th>
                  <th className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>Grade</th>
                </tr>

                {
                  subjectMarks[0]?.marks?.filter((st) => (st.mark < max && st.mark > min)).map((st, index) => (
                    <tr key={index}>
                      <td className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>{st?.studentId?._id}</td>
                      <td className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>{st?.studentId?.firstName + ' ' + st?.studentId?.lastName}</td>
                      <td className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>{st?.mark}</td>
                      <td className='px-4 py-2 bg-cyan-50 hover:bg-cyan-100'>{calculateGrade(st?.mark)}</td>
                    </tr>
                  ))
                }


              </table>
            </div>
          </div>
        </> : <Loader />
      }


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Activity
          </Typography>
          <div className='flex flex-col w-full space-y-5 mb-10'>
            <TextField placeholder='Title' fullWidth label='Title' value={activity.title} onChange={(e) => handleCreateChange('title', e.target.value)}></TextField>

            <TextField placeholder='Description' fullWidth label='Description' value={activity.desc} onChange={e => handleCreateChange('desc', e.target.value)}></TextField>

            <TextField placeholder='Link' fullWidth label='Link' value={activity.link} onChange={e => handleCreateChange('link', e.target.value)}></TextField>
          </div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Activity Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={activity.actType}
              onChange={e => handleCreateChange('actType', e.target.value)}
            >
              <FormControlLabel value="activity" control={<Radio />} label="Assignment" />
              <FormControlLabel value="learning" control={<Radio />} label="Learning Material" />
            </RadioGroup>
          </FormControl>
          <Button variant='contained' color='success' onClick={handleActCreate}>Create</Button>
        </Box>
      </Modal>
      {/* Update Modal */}
      <Modal
        open={updateOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Current Activity
          </Typography>
          <br />
          <div className='flex flex-col w-full space-y-5 mb-10'>
            <TextField placeholder='Title' fullWidth label='Title' value={selectedActivity.title} onChange={(e) => handleUpdateChange('title', e.target.value)}></TextField>

            <TextField placeholder='Description' fullWidth label='Description' value={selectedActivity.desc} onChange={e => handleUpdateChange('desc', e.target.value)}></TextField>

            <TextField placeholder='Link' fullWidth label='Link' value={selectedActivity.link} onChange={e => handleUpdateChange('link', e.target.value)}></TextField>
          </div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Activity Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedActivity.actType}
              onChange={e => handleUpdateChange('actType', e.target.value)}
            >
              <FormControlLabel value="activity" control={<Radio />} label="Assignment" />
              <FormControlLabel value="learning" control={<Radio />} label="Learning Material" />
            </RadioGroup>
          </FormControl>
          <Button variant='contained' color='success' onClick={handleActUpdate}>Update</Button>
        </Box>
      </Modal>
    </div>

  )
}

export default MySubject