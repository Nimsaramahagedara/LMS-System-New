import React from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import BookIcon from '@mui/icons-material/Book';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Card, Link, Typography, colors } from '@mui/material';
import SubjectCard from '../../components/StudentDashboard/SubjectCard';
import NoticeCard from '../../components/StudentDashboard/NoticeCard';
import { useParams } from 'react-router-dom';

const SingleModuleViewPage = () => {
  const { id } = useParams();
  return (

    <ContainerStudent>
      <PageTitle title={id} icon={<BookIcon fontSize='large' />} bgColor='bg-purple-800' />
      <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-yellow-400 mb-10'>
            Subject Notices
          </div>
          <div className='px-5'>
            <NoticeCard title={'Notice 1'} content={'Dear Students, This is to inform you that the Science Club meeting scheduled for 22/12/23 has been postponed to [New Date] due to unforeseen circumstances. We apologize for any inconvenience caused and appreciate your understanding. Please make a note of the new date, and we look forward to your active participation.Thank you,[Your Name]Science Club Coordinator'}/>
          </div>

          <div className='px-5 py-2 bg-cyan-200 my-10'>
            Activity
          </div>

          <div className='px-5'>
            <NoticeCard title={'Activity 1'} content={'Cupidatat et magna sunt elit enim sint est eiusmod velit do ullamco ad exercitation voluptate. Aliqua culpa irure Lorem enim pariatur eu anim quis reprehenderit eiusmod est reprehenderit sunt. Esse id non minim sint minim mollit veniam non aute anim ad eu. Adipisicing quis ut do aliquip voluptate adipisicing non aliqua amet. Occaecat velit tempor cupidatat tempor nisi id dolore.'} />
          </div>

          <div className='px-5 py-2 bg-gray-400 my-10'>
            Teacher In Charge
          </div>
          <div className='px-5'>
            <Typography>Teacher:  <Link>Namali Weerasinghe</Link></Typography>
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='subtitle2' color={colors.grey[500]}>Notices</Typography>
          <Typography variant='subtitle2' color={colors.grey[500]}>Activity</Typography>
        </div>

      </div>

    </ContainerStudent>
  )
}

export default SingleModuleViewPage