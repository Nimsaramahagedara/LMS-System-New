import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import BookIcon from '@mui/icons-material/Book';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Card, Link, Typography, colors } from '@mui/material';
import SubjectCard from '../../components/StudentDashboard/SubjectCard';
import NoticeCard from '../../components/StudentDashboard/NoticeCard';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import Loader from '../../components/Loader/Loader';

const SingleModuleViewPage = () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [subjectDetails, setSubject] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getAllActivity = async () => {
    try {
      const data = await authAxios.get(`${apiUrl}/activity/${id}`)
      const subjectDetails = await authAxios.get(`${apiUrl}/student/get-subject/${id}`)
      setAssignments(data.data);
      setSubject(subjectDetails.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

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

  return (

    <ContainerStudent>
      {
        !isLoading ? <>
          <PageTitle title={subjectDetails.subName} icon={<BookIcon fontSize='large' />} bgColor='bg-purple-800' />
          <div className='flex items-start mt-5 justify-between'>
            <div className='md:w-5/6 w-full'>
              <div className='px-5 py-2 bg-yellow-400 mb-10'>
                Subject Notices
              </div>
              <div className='px-5'>
                <NoticeCard title={'Notice 1'} content={'Dear Students, This is to inform you that the Science Club meeting scheduled for 22/12/23 has been postponed to [New Date] due to unforeseen circumstances. We apologize for any inconvenience caused and appreciate your understanding. Please make a note of the new date, and we look forward to your active participation.Thank you,[Your Name]Science Club Coordinator'} />
              </div>

              <div className='px-5 py-2 bg-cyan-200 my-10'>
                Activity
              </div>

              <div className='px-5'>
                {
                  assignmentType.assignments.map((act, key) => (
                    <NoticeCard title={act.title} content={act.desc} createdAt={act.createdAt} key={key} />

                  ))
                }
              </div>

              <div>
                <div className='px-5 py-2 bg-green-200 my-10'>
                  Given Learning Materials
                </div>
                <br />
                {
                  assignmentType.materials.map((lmt, key) => (
                    <div className='bg-green-300 text-black rounded-lg p-3 mb-3 relative' key={key}>
                      <h4>{lmt.title}</h4>
                      <p className='text-xs'>{lmt.desc}</p>
                      <a href={lmt.link} target='_blank' className='text-xs text-blue-500'>{lmt.link}</a>
                      <p className='text-right text-xs text-gray-900'>{lmt.createdAt}</p>
                    </div>
                  ))
                }
              </div>

              <div className='px-5 py-2 bg-gray-400 my-10'>
                Teacher In Charge
              </div>
              <div className='px-5'>
                <Typography>Teacher:  <Link>{subjectDetails && (subjectDetails.teachBy.firstName + ' ' + subjectDetails.teachBy.lastName)}</Link></Typography>
              </div>
            </div>
            <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
              <Typography variant='subtitle2' color={colors.grey[500]}>Notices</Typography>
              <Typography variant='subtitle2' color={colors.grey[500]}>Activity</Typography>
            </div>

          </div>
        </> : <Loader/>
      }



    </ContainerStudent>
  )
}

export default SingleModuleViewPage