import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service.js";

export class TicketController {
    // DI - WssService
    constructor(
        private readonly ticketService = new TicketService()
    ) { }

    public getTickets = async (req: Request, res: Response) => {
        res.json(this.ticketService.tickets)
    }

    public getLastTicketNumber = async (req: Request, res: Response) => {
        res.json(this.ticketService.lastTicketNumber)
    }

    public pendingTickets = async (req: Request, res: Response) => {
        res.json(this.ticketService.pendigTickets)
    }

    public createTicket = async (req: Request, res: Response) => {
        res.status(201).json(this.ticketService.createTicket())
    }

    public drawTicket = async (req: Request, res: Response) => {
        const { desk } = req.params
        if (!desk || typeof desk !== 'string') {
            return res.status(400).json({ message: 'El parámetro "desk" es requerido y debe ser un texto.' });
        }
        res.json(this.ticketService.drawTicket(desk))
    }

    public ticketFinished = async (req: Request, res: Response) => {
        const { ticketId } = req.params
        if (!ticketId || typeof ticketId !== 'string') {
            return res.status(400).json({ message: 'El parámetro "ticketId" es requerido y debe ser un texto.' });
        }
        res.json(this.ticketService.onFinishedTicket(ticketId))
    }

    public workingOn = async (req: Request, res: Response) => {
        res.json(this.ticketService.lastWorkingOnTickets)
    }


}