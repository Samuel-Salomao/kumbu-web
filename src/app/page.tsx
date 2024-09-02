"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useRef } from "react"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"

const getRandomColor = () => {
  return "#" + Math.floor(Math.random()*16777215).toString(16)
}

const initialMonthData: Record<number, Array<{ category: string; amount: number; type: string; color: string }>> = {
  1: [
    { category: "Salário", amount: 5000, type: "income", color: "#4CAF50" },
    { category: "Aluguel", amount: 1200, type: "expense", color: "#F44336" },
    { category: "Supermercado", amount: 400, type: "expense", color: "#2196F3" },
    { category: "Investimentos", amount: 1000, type: "expense", color: "#9C27B0" },
  ]
}

export default function Component() {
  const [selectedMonth, setSelectedMonth] = useState(1)
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState<'income' | 'expense'>('income')
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [monthData, setMonthData] = useState(initialMonthData)
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const scrollRef = useRef<HTMLDivElement>(null)
 
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const totalExpense = monthData[selectedMonth]?.reduce((acc, item) => item.type === 'expense' ? acc + item.amount : acc, 0) || 0
  const totalIncome = monthData[selectedMonth]?.reduce((acc, item) => item.type === 'income' ? acc + item.amount : acc, 0) || 0

  const handleMonthClick = (index: number) => {
    setSelectedMonth(index)
  }

  const handleAddTransaction = (newType: 'income' | 'expense') => {
    setType(newType)
    if (newType === 'income') {
      setIsIncomeModalOpen(true)
    } else {
      setIsExpenseModalOpen(true)
    }
  }

  return (
    <div className="container mx-auto py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Controle de Despesas</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 relative pb-24">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => handleScroll('left')} className="text-2xl text-gray-600 hover:text-gray-800">&larr;</button>
          <div ref={scrollRef} className="flex overflow-x-hidden space-x-4 flex-grow">
            {months.map((month, index) => (
              <button
                key={index}
                onClick={() => handleMonthClick(index)}
                className={`text-lg font-medium py-2 px-4 rounded-full transition-colors ${
                  selectedMonth === index ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}>
                {month}
              </button>
            ))}
          </div>
          <button onClick={() => handleScroll('right')} className="text-2xl text-gray-600 hover:text-gray-800">&rarr;</button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center mb-4 sm:mb-0">
            <p className="text-sm text-muted-foreground">Receitas</p>
            <p className="text-2xl font-bold text-green-500">R${totalIncome.toFixed(2)}</p>
          </div>
          <div className="text-center mb-4 sm:mb-0">
            <p className="text-sm text-muted-foreground">Despesas</p>
            <p className="text-2xl font-bold text-red-500">R${totalExpense.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Saldo</p>
            <p className="text-2xl font-bold text-blue-500">R${(totalIncome - totalExpense).toFixed(2)}</p>
          </div>
        </div>

        <Tabs defaultValue="receitas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="receitas">Receitas</TabsTrigger>
            <TabsTrigger value="despesas">Despesas</TabsTrigger>
          </TabsList>
          <TabsContent value="receitas">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {monthData[selectedMonth]?.filter(item => item.type === 'income').map((item, index) => (
                <div key={index} className="bg-card rounded-lg shadow p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: item.color}}>
                    <span className="text-white text-xl">{item.category[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{item.category}</p>
                    <p className="text-lg font-bold">R${item.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="despesas">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {monthData[selectedMonth]?.filter(item => item.type === 'expense').map((item, index) => (
                <div key={index} className="bg-card rounded-lg shadow p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: item.color}}>
                    <span className="text-white text-xl">{item.category[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{item.category}</p>
                    <p className="text-lg font-bold">R${item.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 mt-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleAddTransaction('income')}
                  className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold hover:bg-green-600 transition-colors"
                >
                  <ArrowUpCircle className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar Receita</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleAddTransaction('expense')}
                  className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold hover:bg-red-600 transition-colors"
                >
                  <ArrowDownCircle className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar Despesa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog open={isIncomeModalOpen} onOpenChange={setIsIncomeModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Receita</DialogTitle>
                <DialogDescription>
                  Insira os detalhes da sua nova receita aqui.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault()
                if (category && amount) {
                  const newTransaction = {
                    category,
                    amount,
                    type: 'income',
                    color: getRandomColor(),
                  }
                  setMonthData((prevData) => ({
                    ...prevData,
                    [selectedMonth]: [...(prevData[selectedMonth] || []), newTransaction],
                  }))
                  setCategory('')
                  setAmount(0)
                  setIsIncomeModalOpen(false)
                }
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="income-category" className="text-right">
                      Categoria
                    </Label>
                    <Input
                      id="income-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="income-amount" className="text-right">
                      Valor
                    </Label>
                    <Input
                      id="income-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Adicionar Receita</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Despesa</DialogTitle>
                <DialogDescription>
                  Insira os detalhes da sua nova despesa aqui.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault()
                if (category && amount) {
                  const newTransaction = {
                    category,
                    amount,
                    type: 'expense',
                    color: getRandomColor(),
                  }
                  setMonthData((prevData) => ({
                    ...prevData,
                    [selectedMonth]: [...(prevData[selectedMonth] || []), newTransaction],
                  }))
                  setCategory('')
                  setAmount(0)
                  setIsExpenseModalOpen(false)
                }
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expense-category" className="text-right">
                      Categoria
                    </Label>
                    <Input
                      id="expense-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expense-amount" className="text-right">
                      Valor
                    </Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Adicionar Despesa</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}