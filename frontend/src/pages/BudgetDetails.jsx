import PanelLayout from '../components/PanelLayout';
import BudgetForm from '../components/BudgetForm';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import {toast, ToastContainer} from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { findBudgetById, updateBudget } from '../services/budget';
import statusValidate from '../Utils/statusValidate';
import { ChevronLeft } from 'lucide-react';

function BudgetDetails() { 
    const navigate = useNavigate();

    const [budget, setBudget] = useState(null);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    
    const [loading, setLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await findBudgetById(id);
                
                setBudget(response.data);
                setSelectedCustomer(response.data?.customer);
            } catch(error) {
                const status = error?.response?.status;

                statusValidate(status);
            } finally {
                setLoading(false)
            }
        }

        fetchData();

    }, []);

    const onFormSubmit = async (data) => {
        setLoading(true);

        try {
            const customerId = data.customer?.value;

            await updateBudget({id: id, customerId: customerId, description: data.description, proposalNumber: data.proposalNumber, bdi: data.bdi});

            toast.success("Orçamento atualizado com sucesso");
            navigate(`/orcamentos/${id}`);
        } catch(error) {
            const status = error?.response?.status;

            statusValidate(status);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100">
            <PanelLayout actualSection={"criar-orcamento"} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <div className='flex flex-col w-full h-screen justify-center md:w-3/4 md:h-auto lg:w-1/2 lg:ml-[310px] px-5 py-8 bg-white rounded-lg'>
                    <div>
                        <div className='mb-4 flex items-center gap-3'>
                            <div 
                                className='cursor-pointer rounded-md hover:bg-gray-200 p-1' 
                                onClick={() => navigate(`/orcamentos/${id}`)}
                            >
                                <ChevronLeft />
                            </div>
                            <h3 className='text-3xl'>
                                Dados do Orçamento
                            </h3>
                        </div>

                        {budget && (<BudgetForm submitButtonLabel={"Atualizar"} onSubmit={onFormSubmit} setLoading={setLoading} defaultValues={budget} selectedCustomer={selectedCustomer}/>)}
                    </div>
                </div>
            </PanelLayout>

            {loading && <LoadingScreen />}

        </div>
    );
}

export default BudgetDetails;