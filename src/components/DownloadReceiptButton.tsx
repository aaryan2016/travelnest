'use client';

import { jsPDF } from 'jspdf';
import { type selectedRoomsData } from '@/components/HotelRoomWrapper';

interface Props {
    selectedRooms: selectedRoomsData[];
    totalPrice: number;
    numberOfNights: number;
    from: string;
    to: string;
    propertyName: string;
}

export default function DownloadReceiptButton({
    selectedRooms,
    totalPrice,
    numberOfNights,
    from,
    to,
    propertyName,
}: Props) {
    const handleDownload = () => {
        const doc = new jsPDF();
        let y = 20;

        const receiptDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });


        const primaryColor = [37, 99, 235] as const;
        const grayDark = [55, 65, 81] as const;
        const gray = [107, 114, 128] as const;
        const lineColor = [229, 231, 235] as const;

        const [pr, pg, pb] = primaryColor;
        const [grdR, grdG, grdB] = grayDark;
        const [grR, grG, grB] = gray;
        const [lr, lg, lb] = lineColor;


        // Header
        doc.setFontSize(20);
        doc.setTextColor(pr, pg, pb);
        doc.text('Booking Receipt', 105, y, { align: 'center' });

        y += 10;
        doc.setFontSize(14);
        doc.setTextColor(grdR, grdG, grdB);
        doc.text(propertyName, 105, y, { align: 'center' });

        y += 10;
        doc.setDrawColor(lr, lg, lb);
        doc.line(20, y, 190, y);

        // Booking Info
        y += 12;
        doc.setFontSize(12);
        doc.setTextColor(grdR, grdG, grdB);
        doc.text('Booking Details', 20, y);

        y += 8;
        doc.setFontSize(11);
        doc.setTextColor(grR, grG, grB);
        doc.text(`Check-In:`, 25, y);
        doc.text(from, 60, y);

        y += 6;
        doc.text(`Check-Out:`, 25, y);
        doc.text(to, 60, y);

        y += 6;
        doc.text(`Number of Nights:`, 25, y);
        doc.text(`${numberOfNights}`, 60, y);

        y += 6;
        doc.text(`Receipt Date:`, 25, y);
        doc.text(receiptDate, 60, y);

        // Rooms
        y += 12;
        doc.setFontSize(12);
        doc.setTextColor(grdR, grdG, grdB);
        doc.text('Room Summary', 20, y);

        y += 4;
        doc.setDrawColor(lr, lg, lb);
        doc.line(20, y, 190, y);
        y += 8;

        selectedRooms.forEach((room, index) => {
            const roomTotal = room.unitPrice * room.quantity * numberOfNights;

            doc.setFontSize(11);
            doc.setTextColor(pr, pg, pb);
            doc.text(`${index + 1}. ${room.title}`, 25, y);

            y += 5;
            doc.setFontSize(10);
            doc.setTextColor(grR, grG, grB);
            doc.text(room.description, 30, y);

            y += 5;
            doc.text(
                `${room.quantity} × $${room.unitPrice.toFixed(2)} × ${numberOfNights} night(s)`,
                30,
                y
            );

            doc.setTextColor(grdR, grdG, grdB);
            doc.text(`= $${roomTotal.toFixed(2)}`, 160, y, { align: 'right' });

            y += 10;

            // Page break if needed
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        // Divider before total
        doc.setDrawColor(lr, lg, lb);
        doc.line(20, y, 190, y);
        y += 10;

        // Total
        doc.setFontSize(13);
        doc.setTextColor(grdR, grdG, grdB);
        doc.text('Total Price', 25, y);
        doc.setTextColor(pr, pg, pb);
        doc.setFontSize(16);
        doc.text(`$${(totalPrice * numberOfNights).toFixed(2)}`, 160, y, { align: 'right' });

        y += 10;

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
            'Thank you for booking with us. We hope you enjoy your stay!',
            105,
            290,
            { align: 'center' }
        );

        // Save file
        const filename = `receipt-${propertyName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
        doc.save(filename);
    };

    return (
        <button
            onClick={handleDownload}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            Download Receipt (PDF)
        </button>
    );
}
