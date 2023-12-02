import React from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import AddHomeIcon from '@mui/icons-material/AddHome';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Card, Link, Typography, colors } from '@mui/material';
import SubjectCard from '../../components/StudentDashboard/SubjectCard';
import NoticeCard from '../../components/StudentDashboard/NoticeCard';

const ClassPage = () => {
  const otherStudents = [
    'N D Namal',
    'S K Kamal',
    'John Cobra',
    'Saman Perera'
  ]
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
          <div className=' flex items-start justify-evenly flex-wrap'>
            <SubjectCard title='Sinhala' subtitle='Sinhala For Grade 11' description='Lecturer Namali Weerasinghe' bgColor={colors.blue[400]} />
            <SubjectCard title='English' subtitle='English For Grade 11' description='Lecturer Sampath Weerasinghe' bgColor={colors.green[400]} />
            <SubjectCard title='Science' subtitle='Science For Grade 11' description='Lecturer Gunadasa Weerasinghe' bgColor={colors.red[400]} />
            <SubjectCard title='History' subtitle='History For Grade 11' description='Lecturer Nimal Perera' bgColor={colors.yellow[400]} />

          </div>
          <div className='px-5 py-2 bg-gray-400 my-10'>
            Teacher In Charge
          </div>
          <div className='px-5'>
            <Typography>Teacher:  <Link>Namali Weerasinghe</Link></Typography>
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='h6' color={colors.yellow[900]}>Classmates</Typography>
          <hr />
          {
            otherStudents.map((student) => (
              <Link ><Typography variant='subtitle2' color={colors.grey[500]}>{student}</Typography></Link>
            )
            )
          }
        </div>

      </div>

    </ContainerStudent>
  )
}

export default ClassPage