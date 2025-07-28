function BudgetStatus({ status }) {
    const mappedColor = {
        "aprovado": "bg-green-100 text-green-800 border border-green-300",
        "recusado": "bg-red-100 text-red-800 border border-red-300",
        "em andamento": "bg-blue-100 text-blue-800 border border-blue-300",
        "em análise": "bg-yellow-100 text-yellow-800 border border-yellow-300",
    };

    const formattedStatus = status ? status[0].toUpperCase() + status.slice(1).toLowerCase() : null;

    return (
        <span className={`inline-flex items-center px-2 py-[2px] text-xs font-semibold rounded-full ${mappedColor[status]}`}>
            {formattedStatus}
        </span>
    );
}

export default BudgetStatus;