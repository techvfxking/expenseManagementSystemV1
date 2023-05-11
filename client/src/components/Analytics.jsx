import { Progress } from 'antd';
import React from 'react'

const Analytics = ({ allTransection }) => {
  const totalTransactions = allTransection.length;
  const totalIncomeTransaction = allTransection.filter(transaction => transaction.type === 'income');
  const totalExpenseTransaction = allTransection.filter(transaction => transaction.type === 'expense');

  const totalIncomePercent = (totalIncomeTransaction.length / totalTransactions) * 100
  const totalExpensePercent = (totalExpenseTransaction.length / totalTransactions) * 100

  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  
  return (
    <>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransactions}
            </div>
            <div className="card-body">
              <h5 className='text-success'>Income : {totalIncomeTransaction.length}</h5>
              <h5 className='text-danger'>
                Expense : {totalExpenseTransaction.length}
              </h5>
              <div>
                <Progress type='circle'
                  strokeColor={'green'}
                  className='mx-2'
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress type='circle'
                  strokeColor={'red'}
                  className='mx-2'
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Analytics