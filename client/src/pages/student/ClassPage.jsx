import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import AddHomeIcon from '@mui/icons-material/AddHome';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Card, Link, Typography, colors } from '@mui/material';
import SubjectCard from '../../components/StudentDashboard/SubjectCard';
import NoticeCard from '../../components/StudentDashboard/NoticeCard';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';

const ClassPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const [teacherInCharge, setTeacher] = useState('');
  const [Mates, setMates] = useState([]);
  
  const getSubjects = async ()=>{
    try {
      const data = await authAxios.get(`${apiUrl}/student/get-subjects`);
      const classMates = await authAxios.get(`${apiUrl}/student/get-classmates`);
      setSubjects(data.data.subjects);
      setTeacher(data.data.ownedBy);
      setMates(classMates.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=>{
    getSubjects()
  },[])
  return (

    <ContainerStudent>
      <PageTitle title={'Your Class Room'} icon={<AddHomeIcon fontSize='large'/>} bgColor='bg-purple-800' />
      <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-cyan-200 mb-10'>
            Class Notices
          </div>
          <div className='px-5'>
           <NoticeCard title={'Attention All Students of Class 11/B !!'} content={'Lorem ipsum Lajsks sajjds jj'}/>
          </div>
          <div className='px-5 py-2 bg-yellow-400 my-10'>
            Your Subjects
          </div>
          <div className=' flex items-start justify-start flex-wrap'>
            {
             !isLoading ? subjects.map((subj)=>(
                <SubjectCard title={subj.subName} subtitle={subj.subName + currentYear } description={`Teacher ${subj.teachBy.firstName + ' ' +subj.teachBy.lastName }`} bgColor={colors.green[400]} to={`../subject/${subj._id}`}/>
              )) : <Loader/>
            }
            {/* <SubjectCard title='Sinhala' subtitle='Sinhala For Grade 11' description='Lecturer Namali Weerasinghe' bgColor={colors.blue[400]} />
            <SubjectCard title='English' subtitle='English For Grade 11' description='Lecturer Sampath Weerasinghe' bgColor={colors.green[400]} />
            <SubjectCard title='Science' subtitle='Science For Grade 11' description='Lecturer Gunadasa Weerasinghe' bgColor={colors.red[400]} />
            <SubjectCard title='History' subtitle='History For Grade 11' description='Lecturer Nimal Perera' bgColor={colors.yellow[400]} /> */}
          </div>
          <div className='px-5 py-2 bg-gray-400 my-10'>
            Teacher In Charge
          </div>
          <div className='px-5'>
            <Typography>Teacher:  <Link>{teacherInCharge}</Link></Typography>
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='h6' color={colors.yellow[900]}>Classmates</Typography>
          <hr />
          {
            Mates.map((student) => (
              <Link ><Typography variant='subtitle2' color={colors.grey[500]}>{student.firstName}</Typography></Link>
            )
            )
          }
        </div>

      </div>

    </ContainerStudent>
  )
}

export default ClassPage