"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleOrderQuery } from "@/features/order/orderApi";
import { baseURL } from "@/utils/BaseURL";
import {
    CheckCircle2,
    Clock,
    Package,
    CreditCard,
    MapPin,
    Phone,
    Printer,
    Copy,
    Check,
    ShieldCheck,
    ArrowLeft,
    ShoppingBag,
    Loader2,
    FileText,
    Building,
    QrCode,
    Tag,
} from "lucide-react";

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const { data, isLoading, isError, error } = useGetSingleOrderQuery(
        { orderId: id },
        { skip: !id }
    );

    // Extract order data from response
    const order = data?.data || data?.order || data;

    const getImageSrc = (imgPath?: string) => {
        if (!imgPath) return "/placeholder-product.png";
        if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return imgPath;
        const cleanPath = imgPath.replace(/\\/g, "/");
        const formattedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
        const cleanBaseUrl = (baseURL || "").replace(/\/+$/, "");
        return `${cleanBaseUrl}${formattedPath}`;
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "N/A";
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    const getStatusBadge = (status?: string) => {
        const s = status?.toLowerCase() || "";
        if (s === "completed" || s === "delivered") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 size={13} /> {status}
                </span>
            );
        }
        if (s === "pending" || s === "processing") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Clock size={13} /> {status}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                <Package size={13} /> {status || "Processing"}
            </span>
        );
    };

    const getPaymentBadge = (status?: string) => {
        const s = status?.toLowerCase() || "";
        if (s === "paid") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CreditCard size={13} /> Paid
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <CreditCard size={13} /> {status || "Pending"}
            </span>
        );
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#210309] text-white flex flex-col items-center justify-center p-6">
                <div className="flex flex-col items-center gap-4 bg-[#280b11] border border-[#EF524626] p-10 rounded-3xl shadow-2xl">
                    <Loader2 size={40} className="animate-spin text-[#FF7A75]" />
                    <p className="text-sm font-medium text-[#FFE9E8]/70">Loading order details...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (isError || !order || (!order._id && !order.id && !order.productList)) {
        return (
            <div className="min-h-screen bg-[#210309] text-white flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full bg-[#280b11] border border-[#EF524640] p-8 rounded-3xl text-center shadow-2xl space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
                        <ShoppingBag size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">Order Not Found</h2>
                        <p className="text-xs text-[#FFE9E8]/60">
                            {error && "data" in error
                                ? (error.data as any)?.message || "Unable to fetch order information."
                                : "The requested order details are unavailable or may have been moved."}
                        </p>
                    </div>
                    <button
                        onClick={() => router.push("/")}
                        className="px-6 py-2.5 rounded-full bg-[#6B000C] border border-[#FF7A75]/30 text-xs font-semibold text-white hover:bg-[#850311] transition-all duration-300 cursor-pointer"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#210309] text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Navigation Bar */}
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={() => router.push("/")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EF524626] bg-[#33171d] text-xs font-semibold text-[#FFE9E8]/80 hover:text-white hover:border-[#FF7A75]/40 hover:bg-[#1C060B] transition-all duration-300 cursor-pointer"
                    >
                        <ArrowLeft size={14} /> Home
                    </button>
                </div>

                {/* Main Order Card */}
                <div className="bg-[#280b11] border border-[#EF524633] rounded-[28px] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-8 relative overflow-hidden">
                    {/* Subtle Ambient Background Gradient */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#EF5246]/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#3E1119]/80">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-[#FF7A75] uppercase tracking-wider">
                                    Order Details
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <ShieldCheck size={12} /> Verified Public Order
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                                Order <span className="text-[#FF7A75]">#{order._id || id}</span>
                            </h1>
                            <p className="text-xs text-[#FFE9E8]/60 flex items-center gap-2">
                                <Clock size={13} className="text-[#FF7A75]" /> Placed on {formatDate(order.orderDate || order.createdAt)}
                            </p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2.5">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#FFE9E8]/50">Order Status:</span>
                                {getStatusBadge(order.status)}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#FFE9E8]/50">Payment:</span>
                                {getPaymentBadge(order.paymentStatus)}
                            </div>
                        </div>
                    </div>

                    {/* Product Items List */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#FF7A75] flex items-center gap-2">
                            <Package size={16} /> Ordered Items ({order.productList?.length || 0})
                        </h2>

                        <div className="space-y-3">
                            {order.productList && order.productList.length > 0 ? (
                                order.productList.map((item: any, idx: number) => {
                                    const product = item.productId || {};
                                    const imgUrl = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "";

                                    return (
                                        <div
                                            key={item._id || idx}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#1C060B]/70 border border-[#3E1119] hover:border-[#EF5246]/30 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Product Image / Icon */}
                                                <div className="w-16 h-16 rounded-xl bg-[#280b11] border border-[#EF5246]/20 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                    {imgUrl ? (
                                                        <img
                                                            src={getImageSrc(imgUrl)}
                                                            alt={product.name || "Product"}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLElement).style.display = "none";
                                                            }}
                                                        />
                                                    ) : (
                                                        <ShoppingBag size={24} className="text-[#FF7A75]/60" />
                                                    )}
                                                </div>

                                                <div className="space-y-1">
                                                    <h3 className="text-sm font-semibold text-white">
                                                        {product.name || "Purchased Product"}
                                                    </h3>
                                                    {product.description && (
                                                        <p className="text-xs text-[#FFE9E8]/50 line-clamp-1 max-w-md">
                                                            {product.description}
                                                        </p>
                                                    )}
                                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#FFE9E8]/60 pt-1">
                                                        <span>Qty: <strong className="text-white">{item.quantity || 1}</strong></span>
                                                        <span>•</span>
                                                        <span>Unit Price: <strong className="text-white">${item.price || 0}</strong></span>
                                                        {item.weight && (
                                                            <>
                                                                <span>•</span>
                                                                <span>Weight: {item.weight}g</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Total Item Price */}
                                            <div className="text-right sm:self-center w-full sm:w-auto border-t sm:border-t-0 border-[#3E1119] pt-2 sm:pt-0">
                                                <span className="text-xs text-[#FFE9E8]/50 block sm:hidden">Total</span>
                                                <span className="text-base font-bold text-[#FF7A75]">
                                                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="p-4 rounded-xl bg-[#1C060B] border border-[#3E1119] text-xs text-[#FFE9E8]/50 text-center">
                                    No items listed for this order.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Grid Details: Shipping Address */}
                    <div className="pt-4">
                        {/* Delivery / Shipping Address Card */}
                        <div className="p-5 rounded-2xl bg-[#1C060B]/70 border border-[#3E1119] space-y-3">
                            <h3 className="text-xs font-bold text-[#FF7A75] uppercase tracking-wider flex items-center gap-2">
                                <MapPin size={15} /> Shipping Address
                            </h3>
                            <div className="space-y-1.5 text-xs text-[#FFE9E8]/80 leading-relaxed">
                                <p className="font-semibold text-white">{order.address_line1 || "N/A"}</p>
                                <p>
                                    {[order.city, order.state_code, order.postal_code]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                                {order.country_code && (
                                    <p className="text-[#FFE9E8]/60 font-medium">{order.country_code}</p>
                                )}
                                {order.phone_number && (
                                    <p className="pt-2 flex items-center gap-2 text-[#FF7A75] font-semibold">
                                        <Phone size={13} /> {order.phone_number}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* QR Code & Order Summary Bottom Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#1C060B] border border-[#EF5246]/25">
                        {/* QR Code Display */}
                        {order.qrCodeUrl ? (
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-20 h-20 bg-white p-1.5 rounded-xl shrink-0 border border-[#FF7A75]/30 shadow-md">
                                    <img
                                        src={order.qrCodeUrl}
                                        alt="Order QR Code"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                        <QrCode size={14} className="text-[#FF7A75]" /> Digital Receipt QR
                                    </h4>
                                    <p className="text-[11px] text-[#FFE9E8]/60 max-w-xs">
                                        Scan or present this QR code to verify order authenticity.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 text-xs text-[#FFE9E8]/50">
                                <FileText size={18} className="text-[#FF7A75]" /> Official Digital Receipt
                            </div>
                        )}

                        {/* Total Amount Box */}
                        <div className="w-full md:w-auto text-right border-t md:border-t-0 md:border-l border-[#3E1119] pt-4 md:pt-0 md:pl-6 space-y-1">
                            <span className="text-xs text-[#FFE9E8]/60 block uppercase font-medium tracking-wider">
                                Total Amount
                            </span>
                            <div className="text-3xl font-black text-white">
                                ${(order.totalAmount || 0).toFixed(2)}
                            </div>
                            {order.giftAmount > 0 && (
                                <span className="text-[11px] text-emerald-400 block font-medium">
                                    Includes ${order.giftAmount} Gift Voucher
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center pt-2">
                        <p className="text-[11px] text-[#FFE9E8]/40">
                            Thank you for your order! If you have any questions regarding your receipt, please contact support.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}